const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
    let scaryemb = new MessageEmbed().setFooter(config.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    if (!message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, `Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({timeout: 10000}));
    let miktar = Number (args[0]);
    if (!miktar || miktar < 1 || miktar > 100) return Functions.embedHata(message.author, message.channel, `Geçerli bir miktar belirtmelisin.`).then(x => x.delete({timeout: 10000}));
    message.channel.bulkDelete(miktar).then(x => Functions.embedBasari(message.author, message.channel, `\`${message.channel.name}\` kanalındaki **${x.size}** mesaj başarıyla silindi! ${emojis.onay}`)).then(y => y.delete({timeout: 10000}));
  };

module.exports.config = {
    name: "clear",
    aliases: ["sil"],
    usage: "Taslak",
    description: "Taslak Komutu."
};