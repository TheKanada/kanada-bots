const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client , message, args) => {
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
	let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
  let scaryemb = new MessageEmbed()
    .setColor("RANDOM")
    .setFooter(config.footer)
  .setAuthor(victim.tag, avatar)
	.setImage(avatar)
  /*
        db.set(`jroles.${member.id}`, member.roles.cache.map(x => x.id))
   //kaydederken
  
  await member.roles.set(db.get(`jroles.${member.id}`)).catch(e => { }); //unjail atarken
  await db.delete(`jroles.${member.id}`);// sonra veriyi sil
 
  */
	message.channel.send(scaryemb);
  };

module.exports.config = {
    name: "avatar",
    aliases: ["pp"],
    usage: "Taslak",
    description: "Taslak Komutu."
};