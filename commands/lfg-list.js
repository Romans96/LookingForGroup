const Discord = require('discord.js');
module.exports = {
	name: 'lfg-list',
    description: 'Show the list of users that have the specified role in their profile',
    async execute(msg, args, prefix, myGuild, myGuildRoles, lang, myGuildLang, embedTrue, embedError) {

        // Check for the rights Command Parameters
        if (!args[1]) {
            embedError.setDescription( lang("listErr", myGuildLang) )
                .setFooter( lang("listFooterErr", myGuildLang) )
            return msg.channel.send(embedError);
        }

        // Asking to LFG Database for the specified role, searching for the name by user input and by guild
        const role = await myGuildRoles.findOne({
            where: {
                roleName: args.slice(1).join(" ").toLowerCase(),
                guildID: msg.guild.id
            }
        })

        // Check if exist that role, with that name
        if (!role) {
            embedError.setDescription( lang("nameNotRegistered", myGuildLang) )
                .setFooter( lang("listFooterErr", myGuildLang) )
            return msg.channel.send(embedError)
        }

        // Getting all Guild members that have the specified role in their Profile
        const members = msg.guild.roles.get( role.get('roleID') ).members.map(m => m.user);

        // Checking if exist almost 1 Guild member with that role
        if (members[0]) {
            const my_members = members.map( function(e) {
                return e;
            })
            embedTrue.setDescription(
                `${ lang("usersWithRole", myGuildLang) }: ${ msg.guild.roles.get(role.roleID) } \n\n`+
                '~ '+
                my_members.join('\n~ ')
            )
            return msg.channel.send(embedTrue)
        }
        else {
            embedTrue.setDescription(
                `${ lang("usersWithoutRole", myGuildLang) }: ${ msg.guild.roles.get(role.roleID) }`
            )
            return msg.channel.send(embedTrue)
        }

    }
}