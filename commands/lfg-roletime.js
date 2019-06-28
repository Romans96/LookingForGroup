const Discord = require('discord.js');
module.exports = {
	name: 'lfg-roletime',
    description: 'Modify the duration time (in mmilliseconds) of the LFG Roles. (How many times they will be actived in the users profile)',
    async execute(msg, args, myGuild, lang, myGuildLang, embedTrue, embedError, checkAdmin) {

        // Check if the user who wrotes the message is an Admin
        const settings = await myGuild.findOne({where: {guildID: msg.guild.id}});
        if ( !checkAdmin(msg, settings, Discord, lang, myGuildLang) ) return;

        // Check for rights command parameters
        if (!args[1] || args[2]) {
            embedError.setDescription( lang("roleTimeErr", myGuildLang) )
            return msg.channel.send(embedError);
        }

        const valore = parseInt( args[1].trim() )

        // Check if the passed value (mmilliseconds) is a number and is up of 10 seconds (10000 millis)
        if ( !Number.isInteger(valore) || (parseInt(args[1]) < 10000) ) {
            embedError.setDescription( lang("roleTimeErr", myGuildLang) )
            return msg.channel.send(embedError)
        }

        // Converting the inpuut passed value, from milliseconds in minutes and seconds
        let minuti = parseInt( (valore / 1000) / 60 );
        let secondi = parseInt( (valore / 1000) % 60 );

        // If all is OK i update the value in the LFG Database for the Server where the command it\'s executed
        try {
            await myGuild.update({
                guildRoleDuration: valore
            },{
                where: {
                    guildID: msg.guild.id
                }
            })
            embedTrue.setDescription(`${ lang("timeSet", myGuildLang) } **\`${valore}\`** millis (**${minuti}** m e **${secondi}** s) ! `)
            return msg.channel.send(embedTrue)
        } catch(e) {
            console.log("Error on Roletime update: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
        }
            

    }
}