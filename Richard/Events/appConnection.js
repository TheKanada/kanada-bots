const Discord = require("discord.js");
const fs = require("fs");
module.exports = async () => {
    client.user.setPresence({ activity: { name: config.activity }, status: "idle" });
   }; 
  module.exports.config = {
      name: "ready"
    }