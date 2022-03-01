const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    let permObjesi = {};
    let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
    everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
    });
    everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
    });
    if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.react(emojis.onay);
    Functions.embedBasari(message.author,message.channel,"Kanal kilitlendi!")
    } else {
    permObjesi["SEND_MESSAGES"] = null;
    message.channel.createOverwrite(everyone, permObjesi);
    message.react(emojis.onay);
    Functions.embedBasari(message.author,message.channel,"Kanal kilidi açıldı!")
    };
      };

module.exports.config = {
    name: "lock",
    aliases: ["kilit"],
    usage: "Taslak",
    description: "Taslak Komutu."
};