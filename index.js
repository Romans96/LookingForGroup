const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const lang = require("./language-files/lfg-lang.js");
const Sequelize = require('sequelize');
const fs = require('fs');

const prefix = 'g!';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const sequelize = new Sequelize( {
	database: 'lfg',
	username: 'global',
	password: 'psw',
	host: '127.0.0.1',
	dialect: 'postgres',
	protocol: 'postgres',
	logging: false,
	port: '5432' ,
    define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        }
    },
    omitNull: true,
    // logging: console.log,
    pool: {
		max: 150,
		min: 0,
		idle: 500,
		acquire: 120000,
		evict: 1000
    },
    timestamps: false
});
sequelize.authenticate().then( () => {
		console.log("Sequelize ~ Connection Established");
	}).catch(err => {
		console.error("Sequelize ~ Connection Error: "+ err + ` ~ Error time: ${Date.now()}`);
    });

const guilds = sequelize.define('guilds', {
    guildID: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    guildName: {
        type: Sequelize.STRING,
    },
    guildAdminRole: {
        type: Sequelize.STRING,
        defaultValue: "~",
    },
    guildRoleDuration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    guildLang: {
        type: Sequelize.STRING,
        defaultValue: "en",
    }
    
},{
    timestamps: false
});

const guildRoles = sequelize.define('guildroles', {
    guildID: {
        type: Sequelize.STRING,
    },
    roleName: {
        type: Sequelize.STRING,
    },
    roleID: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
    }
},{
    timestamps: false
})

// Function used for Admin Commands, to check if the user who wrotes the message has the setted Admin role
function checkAdmin(msg, myGuild, Discord, lang, myGuildLang) {
    if ( (msg.author.id !== msg.guild.ownerID)  ) {
        if ( !msg.member.roles.has(myGuild.guildAdminRole) ) {
            const embed = new Discord.RichEmbed()
                .setColor('0xFF0000')
                .setAuthor( lang("cmdNotExecuted", myGuildLang) )
                .setTitle( lang("checkhelp", myGuildLang) )
                .setDescription( lang("noAdmin", myGuildLang) +" ("+ msg.guild.roles.get(myGuild.guildAdminRole)+")" )
            msg.channel.send(embed);
            return 0;
        }
        return 1;
    }
    return 1;
}

client.once('ready', async () => {
    console.log("BOT Attivo -> LookingForGroup");
    client.user.setActivity(`Use g!lfg -help`, {type: 'PLAYING'})
    guilds.sync()
    guildRoles.sync();
});

let roleMap = new Map();
// Event appear on a Message sent
client.on("message", async msg => {
    
    if (msg.author.bot) return;
    
    if (!msg.content.startsWith(prefix)) return;
    if (msg.channel.type === 'dm') return msg.reply( lang("errordm", "en") );

    const commandCHAR = "-";
    let param = null;

    // Taking the respective guild/server and language raw from Database
    let myGuild;
    let myGuildLang;
    try {
        myGuild = await guilds.findOne({where: {guildID: msg.guild.id}});
        myGuildLang = myGuild.guildLang;
    } catch(e) {
        console.log("Error -> guild.id not found: "+ e + ` ~ Error time: ${Date.now()}`)
    }

    // Creating the 'args' parameter after the prefix (in order to take other inputs after the commands)
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    // Taking the 'command' parameter after the prefix (in my case 'command' will be "lfg")
    const command = args.shift().toLowerCase();

    // I take the command after the 'commandCHAR' var
    if (args[0] && args[0].charAt(0) === commandCHAR)
        param = args[0].slice(commandCHAR.length).trim().split(/ +/).shift().toLowerCase();

    // I create the 2 Embeds that i will use for Correct/Wrong responses of each commands
    let embedTrue = null;
    let embedError = null;
    try {
        embedTrue = new Discord.RichEmbed()
            .setColor('0x36393f')
            .setAuthor( lang("rightsyntax", myGuildLang), msg.author.avatarURL)
            .setTimestamp()

        embedError = new Discord.RichEmbed()
            .setColor('0xFF0000')
            .setAuthor( lang("wrongsyntax", myGuildLang), msg.author.avatarURL)
            .setTitle( lang("checkhelp", myGuildLang) )
            .setTimestamp()
    } catch(e) {
        console.log("Error creating embeds: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
    }

    // I check if the command after the prefix is 'lfg'. If it isn't, the bot stop executing
    if (command !== "lfg") return;

    // Users Commands
    if (param === "help") 
        client.commands.get('lfg-help').execute(msg, args, lang, myGuildLang, embedError);
    
    else if (param === "roleslist")
        client.commands.get('lfg-roleslist').execute(msg, args, prefix, guilds, guildRoles, lang, myGuildLang, embedTrue, embedError);

    else if (param === "list")
        client.commands.get('lfg-list').execute(msg, args, prefix, guilds, guildRoles, lang, myGuildLang, embedTrue, embedError);

    else if (!param) {
        if (args[0] && !args[0].startsWith('<@') && (typeof args[0] === 'string')) {
            console.log(args[0])
            embedError.setDescription( lang("indexUserNoRole", myGuildLang) )
                .setFooter( lang("footercheckhelp", myGuildLang) )
            return msg.channel.send(embedError)
        }
        client.commands.get('lfg-user').execute(msg, args, prefix, guilds, guildRoles, roleMap, lang, myGuildLang, embedTrue, embedError);
    }

    // Admin Commands
    else if (param === "config")
        client.commands.get('lfg-config').execute(msg, args, prefix, guilds, guildRoles, lang, myGuildLang, embedTrue, embedError, checkAdmin)
    
    else if (param === "roletime")
        client.commands.get('lfg-roletime').execute(msg, args, guilds, lang, myGuildLang, embedTrue, embedError, checkAdmin)

    else if (param === "language")
        client.commands.get('lfg-language').execute(msg, args, guilds, lang, myGuildLang, embedTrue, embedError, checkAdmin)

    else if (param === "adminrole")
        client.commands.get('lfg-adminrole').execute(msg, args, guilds, lang, myGuildLang, embedTrue, embedError, checkAdmin)

    else if (param === "role")
        client.commands.get('lfg-role').execute(msg, args, prefix, guilds, guildRoles, roleMap, lang, myGuildLang, embedTrue, embedError, checkAdmin)
    
    else {
        embedError.setDescription( lang("indexCmdErr", myGuildLang) )
            .setFooter( lang("footercheckhelp", myGuildLang) )
        return msg.channel.send(embedError)
    }
});

// Event when the Bot is invited into a Guild
client.on("guildCreate", async guild => {
    try {
        await guilds.create({
            guildID: guild.id,
            guildName: guild.name,
        })
        console.log("Added new Guild to the DB. Name: "+guild.name+" (ID: "+guild.id+")");
    } catch(e) {
        console.log("Error on client.guildCreate Event: "+ e + ` ~ Error time: ${Date.now()}`)
    }
})

// Event when the Bot is ejected from a Guild
client.on("guildDelete", async guild => {
    try {
        await guilds.destroy({
            where: {
                guildID: guild.id
            }
        });
        await guildRoles.destroy({
            where: {
                guildID: guild.id
            }
        });
        console.log("Removed a Guild from the DB.  name: "+guild.name+" (ID: "+guild.id+")");
    } catch(e) {
        console.log("Error on client.guildDelete Event: "+ e + ` ~ Error time: ${Date.now()}`)
    }
})

// Loggin the client Errors
client.on("error", e => {
    console.log("Client Error Event: "+ e + ` ~ Error time: ${Date.now()}`)
})

client.login(config.token);