const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
let emb = new MessageEmbed().setFooter(config.footer).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor('RANDOM');  
if (!message.member.roles.cache.has(config.commander) && !message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, `Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({timeout: 10000}));
 let sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
 const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
 let ses = 0;
 for (const [id, voiceChannel] of voiceChannels) ses += voiceChannel.members.size;
 let botlar = message.guild.members.cache.filter(s => s.user.bot && s.voice.channel).size;
let yetkili = message.guild.members.cache.filter(a => a.roles.cache.has(config.commander) && a.voice.channel).size;

Functions.embedOlustur(message.author, message.channel, `Sesli kanallarda toplamda **${sesli}** üye bulunuyor!
Sesli kanallarda **${yetkili}** yetkili bulunuyor!
Sesli kanallarda **${botlar}** bot bulunuyor!`, "RANDOM")
  };

module.exports.config = {
    name: "sesli",
    aliases: [],
    usage: "Taslak",
    description: "Taslak Komutu."
};