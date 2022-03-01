const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, `Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({timeout: 10000}));
let miktar = Number (args[0]);
message.channel.setRateLimitPerUser(miktar).catch();
message.react(emojis.onay);
  };

module.exports.config = {
    name: "slowmode",
    aliases: ["slow", "yavasmod"],
    usage: "Taslak",
    description: "Taslak Komutu."
};