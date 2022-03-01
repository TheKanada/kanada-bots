const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
    let scaryemb = new MessageEmbed().setFooter(config.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim || message.author.id == victim.id) return Functions.embedHata(message.author, message.channel, `Bir üye belirtmelisin.`).then(x => x.delete({timeout: 10000}));
    if (!message.member.voice.channel || !victim.voice.channel || message.member.voice.channelID == victim.voice.channelID) return Functions.embedHata(message.author, message.channel, `Belirtilen üye veya sen sesli kanalda değilsin.`).then(x => x.delete({timeout: 10000}));
    if (message.member.hasPermission("ADMINISTRATOR")) {
        message.member.voice.setChannel(victim.voice.channelID).catch();
            message.react(emojis.onay)
        
    }else{
    
    const filter = (reaction, user) => {
        return [emojis.onayemoji].includes(reaction.emoji.id) && user.id === victim.id; 
        };
    
        message.channel.rsend(scaryemb.setDescription(`${victim}, ${message.author} adlı üye senin sesli kanalına girmek istiyor, kabul ediyor musun?`).setFooter(`Kabul etmek için 15 saniyen bulunuyor.`)).then(x => {
            x.react(emojis.onayemoji);
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
                    message.member.voice.setChannel(victim.voice.channelID).catch();
            x.delete()
            message.react(emojis.onay)
                };
            });
        });
    };
};

module.exports.config = {
    name: "join",
    aliases: ["git"],
    usage: "Taslak",
    description: "Taslak Komutu."
};