const Discord = require("discord.js");
module.exports = async (member) => {

    member.guild.channels.cache.get(config.chat).send(`${member}, Aramıza katıldı hoş geldin. 🎉`)
      member.roles.add(config.member)

}; 
  module.exports.config = {
      name: "guildMemberAdd"
    }