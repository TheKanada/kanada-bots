const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const pdb = new db.table("puanlar")
const cdb = new db.table("cezalar")
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports.execute = async(client , message, args) => {
    if (!message.member.roles.cache.has(config.warnhammer) && !message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, anser.noyt).then(x => x.delete({timeout: 10000}));
//////////
let cezaID = cdb.get(`cezanumarasi.${message.guild.id}`)+1;
let richardinuyesi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ") || false; 

//////////

  if (!richardinuyesi || !sebep) return Functions.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${config.prefix || '.'}warn @Richârd/ID sebep\``).then(x => x.delete({timeout: 10000}));
 


if(message.member.roles.highest.position <= richardinuyesi.roles.highest.position) {
    return Functions.embedHata(message.author, message.channel, `Kendinden üst yetkide birini susturamazsın!`).then(x => x.delete({timeout:6500}));
}

//////////

if(!richardinuyesi.bannable) {
    return Functions.embedHata(message.author, message.channel, `${richardinuyesi} kişisini susturacak yetkim bulunmuyor.`).then(x => x.delete({timeout:6500}));
}

//////////



      let atilanAy = moment(Date.now()).format("MM");
      let saat = parseInt(moment(Date.now()).format("HH"))+3;
      let dakika = moment(Date.now()).format("mm");
      let atilanSaat = `${saat}:${dakika}` 
      let atilanYıl = moment(Date.now()).format("YYYY");
      let atilanGün = moment(Date.now()).format("DD");
      let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
      message.react(emojis.onay)
      Functions.embedBasari(message.author, message.channel, `${richardinuyesi} kullanıcısı ${sebep} sebebi ile uyarıldı! (\`#${cezaID}\`)`)
    
//////////
let ceza = {  
    mod: message.author.id, 
    sebep: sebep, 
    kisi: richardinuyesi.displayName, 
    id: cezaID, 
    zaman: muteAtılma,
    bitis: "KALICI", 
    komut: "WARN" 
    };
  let soncezaaktif = {
    mod: message.member.displayName, 
    sebep: sebep, 
    id: cezaID,  
    durum: `✔️ [AKTIF]`,
    bitis: "KALICI", 
    komut: "WARN" 
  };
cdb.push(`sicil.${richardinuyesi.id}.${config.server}`, ceza);
cdb.add(`sicilsayi.${richardinuyesi.id}.${config.server}`, +1);
cdb.set(`sonceza.${richardinuyesi.id}.${config.server}`, soncezaaktif);
cdb.add(`cezanumarasi.${config.server}`, +1);
Functions.cezaEkle(cezaID, richardinuyesi.id, richardinuyesi.displayName, message.member.displayName, message.author.id, "WARN", sebep, "KALICI", muteAtılma, "KALICI", "warn")
message.guild.log(cezaID, message.author, richardinuyesi, sebep, muteAtılma, "KALICI", "warn", "penal-log")
//////////
};

module.exports.config = {
    name: "warn",
    aliases: ["warn", "uyar", "uyarı", "uyari"],
    usage: "Taslak",
    description: "Taslak Komutu."
};