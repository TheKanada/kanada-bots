const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {

   if (!message.member.roles.cache.has(config.penal) && !message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, `Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({timeout: 10000}));
  
  let sunucu = message.guild.memberCount;

  let online = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;

  
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  let ses = 0;
  for (const [id, voiceChannel] of voiceChannels) ses += voiceChannel.members.size;
  let yetkili = message.guild.members.cache.filter(a => a.roles.cache.has(config.commander)).size;

  let booster = message.guild.premiumSubscriptionCount;
    
  Functions.embedOlustur(message.author, message.channel, `Seslilerimizde **${ses}** Üye bulunmaktadır.
~~--------------------------------------------------~~
Sunucumuzda **${sunucu}** (**${online}**) Üye bulunmaktadır.
Sunucumuzda **${yetkili}** Yetkili bulunmaktadır. 
Sunucumuzda **${booster}** Takiye Bulunmaktadır.`, "RANDOM")
  };

module.exports.config = {
    name: "say",
    aliases: [],
    usage: "Taslak",
    description: "Taslak Komutu."
};