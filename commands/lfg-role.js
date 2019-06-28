const Discord = require('discord.js');
module.exports = {
	name: 'lfg-role',
    description: 'Command that permit to Add/Remove/Edit a speciefied LFG Role in the Server where the command it\'s executed!',
    async execute(msg, args, prefix, myGuild, myGuildRoles, roleMap, lang, myGuildLang, embedTrue, embedError, checkAdmin) {

        // Check if the user who wrotes the message is an Admin
        const settings = await myGuild.findOne({where: {guildID: msg.guild.id}});
        if ( !checkAdmin(msg, settings, Discord, lang, myGuildLang) ) return;

        // console.log(args[1])  // -> Add/Edit/Remove Parameter
        const role = msg.mentions.roles.first();

        // Check for Global Rights Parameters
        if (!role || !args[1] || !args[2]) {
            embedError.setDescription( lang("roleErr", myGuildLang) )
                .setFooter( lang("footercheckhelp", myGuildLang) )
            return msg.channel.send(embedError);
        }

        // Taking the parameter
        const cmd = args[1].trim().toLowerCase();

        switch(cmd) {
            // Case for adding a Server Role to the LFG Database
            case 'add': {
                let roleN = null;
                if (args[3])
                    roleN = args.slice(3).join(" ").toLowerCase();
                else
                    roleN = role.name.toLowerCase();
                
                try {
                    await myGuildRoles.create({
                        guildID: msg.guild.id,
                        roleName: roleN,
                        roleID: role.id
                    })
                    embedTrue.setDescription(`${ lang("roleAdded", myGuildLang) } *${role}* ${ lang("rolePersonalizedName", myGuildLang) } **${roleN}**`)
                    return msg.channel.send(embedTrue)
                } catch(e) {
                    if (e.name === 'SequelizeUniqueConstraintError') {
                        embedError.setDescription( lang("roleAlreadyReg", myGuildLang) )
                        return msg.channel.send(embedError)
                    }
                    console.log("Error Adding a Role: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
                }
            } break;

            // Case for eediting a Server Role already registered on the LFG Database
            case 'edit': {
                if (!args[3]) {
                    embedError.setDescription( lang("roleErr", myGuildLang) )
                        .setFooter( lang("footercheckhelp", myGuildLang) )
                    return msg.channel.send(embedError);
                }
                const roleN = args.slice(3).join(" ").toLowerCase();
                try {
                    const roleupdate = await myGuildRoles.update({
                        roleName: roleN,
                    },{
                        where: {
                            roleID: role.id,
                        }
                    })
                    if (roleupdate[0] === 0) {
                        embedError.setDescription( lang("roleNotReg", myGuildLang) )
                        return msg.channel.send(embedError)
                    }
                    embedTrue.setDescription( `${ lang("roleModifiedName", myGuildLang) } *${role}* ${ lang("roleIn", myGuildLang) } **${roleN}**`)
                    return msg.channel.send(embedTrue)
                } catch(e) {
                    console.log("Error Editing a Role: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
                }
            } break;

            // Case for removing a Server Role already registered on the LFG Database
            case 'remove': {
                if (args[3]) {
                    embedError.setDescription( lang("roleErr", myGuildLang) )
                        .setFooter( lang("footercheckhelp", myGuildLang) )
                    return msg.channel.send(embedError);
                }
                try {
                    const roledestroy = await myGuildRoles.destroy({
                        where: {
                            roleID: role.id,
                        }
                    })

                    if (roledestroy === 0) {
                        embedError.setDescription( lang("roleNotReg", myGuildLang) );
                        return msg.channel.send(embedError);
                    }
                    
                    embedTrue.setDescription(`${ lang("roleEliminated", myGuildLang) } *${role}`)
                    return msg.channel.send(embedTrue)
                } catch(e) {
                    console.log("Error Removing a role: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
                }
            } break;

            default: {
                embedError.setDescription( lang("roleNoParam", myGuildLang) )
                return msg.channel.send(embedError);
            } break;

        }

    }
}