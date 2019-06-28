const Discord = require('discord.js');
module.exports = {
	name: 'lfg-config',
    description: 'Show the Configuration Settings for the LFG Bot in the Server where the command it\'s executed!',
    async execute(msg, args, prefix, myGuild, myGuildRoles, lang, myGuildLang, embedTrue, embedError, checkAdmin) {
        
        // Check if the user who wrotes the message is an Admin
        const settings = await myGuild.findOne({where: {guildID: msg.guild.id}});
        if ( !checkAdmin(msg, settings, Discord, lang, myGuildLang) ) return;

        // Check if the command NOT contains more arguments
        if (args[1]) {
            return msg.channel.send(embedError);
        }
        
        let valoreDurata = settings.guildRoleDuration;

        // Calculating the Minutes and the Seconds of the Roles Duration for the Server 
        let minuti = parseInt( (valoreDurata / 1000) / 60 );
        let secondi = parseInt( (valoreDurata / 1000) % 60 );


        const n_roles = await myGuildRoles.findAll({where: {guildID: msg.guild.id}});

        embedTrue.setDescription(`${ lang("server-config", myGuildLang) }: \`${settings.guildName}\` ~ ID: \`${settings.guildID}\`** `)
        // Prefix Setting Field
            .addField( lang("prefix", myGuildLang) ,`${prefix}`, true)

        // Admin Role Setting Field
        if (settings.guildAdminRole === '~')
            embedTrue.addField( lang("adminrole", myGuildLang),`${ settings.guildAdminRole }`, true)
        else {
            embedTrue.addField( lang("adminrole", myGuildLang),`${ msg.guild.roles.get(settings.guildAdminRole) }`, true)
        }

        // LFG Role Duration Setting Field
        embedTrue.addField( lang("roletime", myGuildLang) ,`${valoreDurata} millis (**${minuti}** m e **${secondi}** s)`, true)
        // Language Setting Field
            .addField( lang("language", myGuildLang), settings.guildLang, true)
        // Registered Roles Count Field
            .addField( lang("regrole", myGuildLang),`${n_roles.length}`, true)

        // Roles list Field 
        if(n_roles.length > 0)
            embedTrue.addField( lang("roleslist", myGuildLang), n_roles.map( (e,i) => msg.guild.roles.get(n_roles[i].roleID)+` ${ lang("roleActivator", myGuildLang) }: **${prefix}lfg ${msg.guild.roles.get(n_roles[i].roleID)}** `) )
        
        // Server Served from the Bot FIeld
        const servers = await myGuild.findAll();
        embedTrue.setFooter(`${ lang("regserver", myGuildLang) }: ${servers.length}`)

        return msg.channel.send(embedTrue);
        
    }
}

