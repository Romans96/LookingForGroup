const Discord = require('discord.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
	name: 'lfg-user',
    description: 'The command that assign/remove the LFG Roles to/from the users',
    async execute(msg, args, prefix, myGuild, myGuildRoles, roleMap, lang, myGuildLang, embedTrue, embedError) {
        
        const uid = msg.author.id;
        const role = msg.mentions.roles.first();

        // Check for rights command parameters
        if (!role || !args[0] || args[1]) {
            embedError.setDescription( lang("userErr", myGuildLang) )
                .setFooter( lang("listFooterErr", myGuildLang) )
            return msg.channel.send(embedError);
        }
        
        // Check if i already have an LFG Role activated in the profile (if yes, i put the id from DB into the variable)
        const morerole = await myGuildRoles.findOne({
            where: {
                guildID: msg.guild.id,
                roleID: {
                    [Op.in]: msg.member.roles.keyArray()
                }
            }
        })

        // I take the role mentioned in the command
        const myrole = await myGuildRoles.findOne({
            where: {
                roleID: role.id,
                guildID: msg.guild.id
            }
        })
        // Check if the role is registered in the LFG Database for the Server
        if (!myrole) {
            embedError.setDescription( lang("userRoleErr", myGuildLang) )
                .setFooter( lang("listFooterErr", myGuildLang) )
            return msg.channel.send(embedError);
        }
        
        // Answer to the user that already have an LFG Role active
        if(morerole) {
            // if the mentioned role is the same as the one active in the profile, i remove it from the profile
            if (msg.member.roles.has(myrole.roleID)) {
                msg.member.removeRole(myrole.roleID);
                if (roleMap.has(uid)) {
                    msg.member.removeRole(myrole.roleID);
                    roleMap.delete(uid);
                }
                embedTrue.setDescription(`**${ role }** ${ lang("userRoleRemoved", myGuildLang) }`)
                return msg.channel.send(embedTrue)
            }
            embedError.setDescription(`**${ msg.guild.roles.get(morerole.roleID) }** ${ lang("userRoleActive", myGuildLang) }`)
            return msg.channel.send(embedError)
        }

        // Check again for the map (where i save the interval of the LFG Role such a value, and the id such a key) and delete the key if it exists!
        if (roleMap.has(uid)) {
            msg.member.removeRole(myrole.roleID);
            roleMap.delete(uid);
        }

        // If all is ok, also the parameters: 
        msg.member.addRole(myrole.roleID)

        // Taking the LFG roleduration from the LFG Database for the Server where i execute the command
        const my_guild = await myGuild.findOne({
            where: {
                guildID: msg.guild.id
            }
        });
        const time = my_guild.get('guildRoleDuration');
        
        /*
        1) I add the role to the user profile
        2) I add to the MAP: the user by id(key), and i start a timer with a setInterval(value) for the role duration
        */
        roleMap.set(uid, 
            setTimeout( () => {
                msg.member.removeRole(myrole.roleID);
                roleMap.delete(uid);
            }, time)
        );
        
        // Setting the date and the timezone for the language selected
        let timezone = null;
        let d = new Date(Date.now() + time);
        if (myGuildLang === 'en'){
            timezone = "UTC";
            d = new Date( d.toLocaleString("en-US", {timeZone: timezone}) )
        }
        else if (myGuildLang === 'it') {
            timezone = "Europe/Rome";
            d = new Date( d.toLocaleString("it-IT", {timeZone: timezone}) )
        }
        
        // Converting the milliseconds in minutes and second
        let minuti = parseInt( (time / 1000) / 60 );
        let secondi = parseInt( (time / 1000) % 60 );

        // Sending the embed, with the times, and the confirmed activation!
        embedTrue.setDescription(`**${ role }** ${ lang("userRoleActived",myGuildLang) } **${prefix}lfg ${ role }**!`)
            .setFooter(`${ lang("activedFor", myGuildLang) } ${minuti}m & ${secondi}s ${ lang("untilTo", myGuildLang) } ${d.getHours()}:${d.getMinutes()} ${timezone}`)
        
        return msg.channel.send(embedTrue)
    }
}