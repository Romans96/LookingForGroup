const Discord = require('discord.js');
module.exports = {
	name: 'lfg-help',
    description: 'Show the Help Page',
    async execute(msg, args, lang, myGuildLang, embedError) {

        if(args[1]) {
            return msg.channel.send(embedError);
        }

        const embed = new Discord.RichEmbed()
            // .attachFiles(['./ICON/logo_lfg.png'])
            .setAuthor(`<LFG> Help <LFG>`, msg.author.avatarURL)
            .setDescription( lang("help", myGuildLang) )
            // .setThumbnail('attachment://logo_lfg.png')

        return msg.channel.send(embed)
    }
}