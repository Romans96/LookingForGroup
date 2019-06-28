const Discord = require('discord.js');
module.exports = {
	name: 'lfg-adminrole',
    description: 'Modify the Administration Role that permit to change the Bot settings (Only Server Owner can set it)',
    async execute(msg, args, myGuild, lang, myGuildLang, ET, EE, checkAdmin) {
        
        // Check if who wrotes the message is the Server Owner
        if (msg.author.id !== msg.guild.ownerID) {
            EE.setDescription( lang("checkOwner", myGuildLang) )
            return msg.channel.send(EE)
        }

        const role = msg.mentions.roles.first()

        // Check for Global Right Parameters
        if (!role || !args[1] || args[2]) {
            EE.setDescription( lang("adminRoleErr", myGuildLang) )
            return msg.channel.send(EE);
        }

        // Update the LFG Admin Role for the Server in the LFG Database
        try {
            await myGuild.update({
                guildAdminRole: role.id
            },{
                where: {
                    guildID: msg.guild.id
                }
            })
            ET.setDescription(`${ lang("settedAdminRole", myGuildLang) } ${role}! `)
            return msg.channel.send(ET)
        } catch(e) {
            console.log("Error on adminrole update: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
        }

    }
}