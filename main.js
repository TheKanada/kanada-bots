const {Client} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const qdb = require('quick.db');
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db");
require("moment-timezone");
const scarydb = new db.table("scaryrollog");
const logs = require('discord-logs');
logs(client)
const commands = new Map();
global.commands = commands;
const aliases = new Map();
const guildInvites = new Map();
global.aliases = aliases;
global.client = client;



///////////////// GLOBALS /////////////////
const Functions = global.Functions = require('./Richard/Database/Functions.js');
const config = global.config = require("./Richard/Configurations/globalConfig");
const emojis = global.emojis = require('./Richard/Configurations/globalEmojis');
require("./Richard/Database/appUtils");
///////////////// GLOBALS /////////////////

///////////////// MAINS /////////////////
client.login(config.token).catch(err => console.error("[ Moderation ] Discord API Botun tokenini doğrulayamadı."));
const globalAnswer = global.globalAnswer = require("./Richard/Database/globalAnswer");
globalAnswer.replySetup()
///////////////// MAINS /////////////////

///////////////////
  client.on("message", (message) => {
        if (message.author.bot ||!message.content.startsWith(config.prefix) || !message.channel || message.channel.type == "dm") return;
        let args = message.content
          .substring(config.prefix.length)
          .split(" ");
        let command = args[0];
        let bot = message.client;
        args = args.splice(1);
        let calistirici;
        if (commands.has(command)) {
          calistirici = commands.get(command);
          calistirici.execute(bot, message, args);
        } else if (aliases.has(command)) {
          calistirici = aliases.get(command);
          calistirici.execute(bot, message, args);
        }
  })
///////////////////
fs.readdir("./Richard/Commands", (err, files) => {
  if(err) return console.error(err);
  files = files.filter(file => file.endsWith(".js"));
console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} COMMANDS LOADED ]`);
  files.forEach(file => {
      let prop = require(`./Richard/Commands/${file}`);
      if(!prop.config) return;
      if(typeof prop.onLoad === "function") prop.onLoad(client);
      commands.set(prop.config.name, prop);
      if(prop.config.aliases) prop.config.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});
/*~~~*/ /*~~~*/ /*~~~*/ /*~~~*/
fs.readdir("./Richard/Events", (err, files) => {
  if(err) return console.error(err);
  console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
  files.filter(file => file.endsWith(".js")).forEach(file => {
      let prop = require(`./Richard/Events/${file}`);
      if(!prop.config) return;
      client.on(prop.config.name, prop);
  });
});
///////////////////
client.on('guildMemberRoleAdd', async(member, role) =>  {
  let atilanAy = moment(Date.now()).format("MM");
  let saat = parseInt(moment(Date.now()).format("HH"))+3;
  let dakika = moment(Date.now()).format("mm");
  let atilanSaat = `${saat}:${dakika}` 
  let atilanYıl = moment(Date.now()).format("YYYY");
  let atilanGün = moment(Date.now()).format("DD");
  let tarihxd = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
  
      const Log = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
      if (!Log || !Log.executor || Log.createdTimestamp < (Date.now() - 5000) || member.guild.roles.cache.get(role.id).position < member.guild.roles.cache.get(config.commander).position) return;
      scarydb.add(`rolsayi_${member.id}`, +1)
      scarydb.push(`rollogu.${member.id}_qwe`, {
      verilenrol: role.id,
      emoji: emojis.onay,
      roldurum: "verildi",
      yetkili: Log.executor.id,
      tarih: tarihxd
      })
  })
  client.on('guildMemberRoleRemove', async(member, role) =>  {
  let atilanAy = moment(Date.now()).format("MM");
  let saat = parseInt(moment(Date.now()).format("HH"))+3;
  let dakika = moment(Date.now()).format("mm");
  let atilanSaat = `${saat}:${dakika}` 
  let atilanYıl = moment(Date.now()).format("YYYY");
  let atilanGün = moment(Date.now()).format("DD");
  let tarihxd = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
      
      const Log = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
      if (!Log || !Log.executor || Log.createdTimestamp < (Date.now() - 5000) || member.guild.roles.cache.get(role.id).position < member.guild.roles.cache.get(config.commander).position) return;
      scarydb.add(`rolsayi_${member.id}`, +1)
      scarydb.push(`rollogu.${member.id}_qwe`, {
      verilenrol: role.id,
      emoji: emojis.hata,
      roldurum: "alındı",
      yetkili: Log.executor.id,
      tarih: tarihxd
      })
  })
  
  client.embedGenislet = async function(description, author = false, footer = false, features = false) {
      let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
      let embeds = new Array()
      for (var i = 0; i < embedSize; i++) {
        let desc = description.split("").splice(i*2048, (i+1)*2048)
        let x = new MessageEmbed().setDescription(desc.join(""))
        if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
        if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
        if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
        if (features) {
          let keys = Object.keys(features)
          keys.forEach(key => {
            if (key == "setTimestamp") return
            let value = features[key]
            if (i !== 0 && key == 'setColor') x[key](value[0])
            else if (i == 0) {
              if(value.length == 2) x[key](value[0], value[1])
              else x[key](value[0])
            }
          })
        }
        embeds.push(x)
      }
      return embeds
    };
    