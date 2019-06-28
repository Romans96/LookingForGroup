const Discord = require('discord.js');
module.exports = {
	name: 'lfg-roleslist',
    description: 'Show the LFG available Roles list for the Server ',
    async execute(msg, args, prefix, myGuild, myGuildRoles, lang, myGuildLang, embedTrue, embedError) {

        // Taking all the raws (each raw a role) for the specified Server
        const n_roles = await myGuildRoles.findAll({where: {guildID: msg.guild.id}});

        // Check for rights parameters
        if (args[1]) {
            embedError.setDescription( lang("roleslistErr", myGuildLang) )
            return msg.channel.send(embedError)
        }

        // Check for number of LFG Roles registered on the Server
        if (n_roles.length === 0) {
            embedTrue.setDescription( lang("roleslistNoRoles", myGuildLang) );
            msg.channel.send(embedTrue);
        }
        else {
            // let cmd = msg.guild.roles.get( n_roles[i].roleID )+` attivabile con il comando: ***${prefix}lfg ${ msg.guild.roles.get(n_roles[i].roleID) }*** `;
            // let cmd1 = `\nLa lista degli utenti che lo utilizzano è visibile con: ***${prefix}lfg -lista ${ n_roles[i].roleName } ***`
            
            embedTrue.setTitle( lang("roleslistMexList", myGuildLang) );

            // Making a script to "split" the embeds in chank (in order to have only a specified number of roles for each page of the embed)
            let i;
            let chunk = 6;
            let slicedarray = [];
            for (i = 0; i < n_roles.length ; i+=chunk) {
                let sliced = n_roles.slice( i, i+chunk );
                slicedarray.push( sliced );
            }

            // Writing in the embed the first page of roles
            embedTrue.setDescription(
                slicedarray[0].map( (elem, i) =>
                        `\n🔹 `+msg.guild.roles.get( elem.roleID )+` ${ lang("roleActivator", myGuildLang) }: ***${prefix}lfg ${ msg.guild.roles.get(elem.roleID) }*** `+
                        `\n~${ lang("usersListCmd", myGuildLang) }: ***g!lfg -list ${ elem.roleName } ***`
                    
                ).join("\n")
            )

            msg.channel.send(embedTrue);

            // In case of more then 'chunk' roles, it will add more separated page of the embed, for each 6 roles more
            if (n_roles.length > chunk) {
                let newemb = new Array();
                let x = 0;
                for (x = 1;  x < slicedarray.length ; x++) {
                    newemb[x] = new Discord.RichEmbed().setColor('0x36393f');
                    newemb[x].setDescription(
                        slicedarray[x].map( (elem, i) =>
                            `\n🔹 `+msg.guild.roles.get( elem.roleID )+` ${ lang("roleActivator", myGuildLang) }: ***${prefix}lfg ${ msg.guild.roles.get(elem.roleID) }*** `+
                            `\n~${ lang("usersListCmd", myGuildLang) }: ***g!lfg -list ${ elem.roleName } ***`
                        
                        ).join("\n")
                    )
                    try {
                        msg.channel.send(newemb[x]);
                    }
                    catch (e) {
                        console.log("Error sending embed rolelist: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`);
                    }
                }
            }

        }
        

    }
}