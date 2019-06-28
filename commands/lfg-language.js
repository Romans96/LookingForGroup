const Discord = require('discord.js');
module.exports = {
	name: 'lfg-language',
    description: 'Modify the language of the LFG Bot in the Server where the command it\'s executed',
    async execute(msg, args, myGuild, lang, myGuildLang, embedTrue, embedError, checkAdmin) {
        
        // Check if the user who wrotes the message is an Admin
        const settings = await myGuild.findOne({where: {guildID: msg.guild.id}});
        if ( !checkAdmin(msg, settings, Discord, lang, myGuildLang) ) return;

        // Check for the Global Rights Parameters
        if (!args[1] || args[2]) {
            embedError.setDescription( lang("languageErr", myGuildLang) )
            return msg.channel.send(embedError);
        }

        // Vailable Languages Array
        const languages = ["en","it"];
        
        const valore = args[1].trim().toLowerCase();

        // Check if the language prefix is between the available languages
        if (!languages.includes(valore)) {
            embedError.setDescription( lang("noLang", myGuildLang) + ": **\`"+ languages.map(i=>i).join(" ~ ") +"\`**");
            return msg.channel.send(embedError)
        }
        // Check if the language prefix is only 2 chars
        else if (valore.length > 2 || valore.length < 2) {
            embedError.setDescription( lang("languageErr", myGuildLang) )
            return msg.channel.send(embedError)
        }

        // If all before is OK, i change the lenguage in the LFG Database for the Server where i write the command
        try {
            await myGuild.update({
                guildLang: valore
            },{
                where: {
                    guildID: msg.guild.id
                }
            })
            embedTrue.setDescription(`${ lang("settedLang", myGuildLang) }: **\`${valore}\`** `)
            return msg.channel.send(embedTrue)
        } catch(e) {
            console.log("Error language update: "+ e + ` ~ on Server ${msg.guild.id}. Error time: ${Date.now()}`)
        }
    }
}