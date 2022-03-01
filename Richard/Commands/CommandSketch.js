const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
  Functions.embedOlustur(message.author, message.channel, "SA", "RANDOM")
  };

module.exports.config = {
    name: "taslak2",
    aliases: [],
    usage: "Taslak",
    description: "Taslak Komutu."
};