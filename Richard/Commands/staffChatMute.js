const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const pdb = new db.table("puanlar")
const cdb = new db.table("cezalar")
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports.execute = async(client , message, args) => {
    if (!message.member.roles.cache.has(config.chatmute) && !message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, anser.noyt).then(x => x.delete({timeout: 10000}));
//////////
let cezaID = cdb.get(`cezanumarasi.${message.guild.id}`)+1;
let richardinuyesi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let zaman = args[1] 
let sahtezaman = zaman;
let sebep = args.splice(2).join(" ") || false; 

//////////

  if (!richardinuyesi || !sebep || !zaman) return Functions.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${config.prefix || '.'}mute @Richârd/ID (1s/1m/1h/1d) sebep\``).then(x => x.delete({timeout: 10000}));
 


if(message.member.roles.highest.position <= richardinuyesi.roles.highest.position) {
    return Functions.embedHata(message.author, message.channel, `Kendinden üst yetkide birini susturamazsın!`).then(x => x.delete({timeout:6500}));
}

//////////

if(!richardinuyesi.bannable) {
    return Functions.embedHata(message.author, message.channel, `${richardinuyesi} kişisini susturacak yetkim bulunmuyor.`).then(x => x.delete({timeout:6500}));
}

//////////


    zaman = zaman.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
    zaman = zaman.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");    
    let zamanimizlar = sahtezaman.replace("s","second").replace("m","minute").replace("h","hours").replace("d","day")
    let zamanimiz = zamanimizlar.replace("second"," saniye").replace("minute"," dakika").replace("hours"," saat").replace("day"," gün")


      let atilanAy = moment(Date.now()).format("MM");
      let saat = parseInt(moment(Date.now()).format("HH"))+3;
      let dakika = moment(Date.now()).format("mm");
      let atilanSaat = `${saat}:${dakika}` 
      let atilanYıl = moment(Date.now()).format("YYYY");
      let atilanGün = moment(Date.now()).format("DD");
      let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
      let bitişAy = moment(Date.now()+ms(zaman)).format("MM");
      let bitissaat = parseInt(moment(Date.now()+ms(zaman)).format("HH"))+3;
      let bitisdakika = moment(Date.now()+ms(zaman)).format("mm");
      let bitişSaat = `${bitissaat}:${bitisdakika}` 
      let bitişGün = moment(Date.now()+ms(zaman)).format("DD");
      let bitişYıl = moment(Date.now()+ms(zaman)).format("YYYY");
      let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişYıl} ${bitişSaat}`;
  

      message.react(emojis.onay)
      Functions.embedBasari(message.author, message.channel, `${richardinuyesi} kullanıcısı yazılı kanallarda **${zamanimiz}** susturuldu (\`#${cezaID}\`)`)
    
//////////
Functions.cezaEkle(cezaID, richardinuyesi.id, richardinuyesi.displayName, message.member.displayName, message.author.id, "CHAT-MUTE", sebep, zamanimiz, muteAtılma, muteBitiş, "chatmute")
let ceza = {  
    mod: message.author.id, 
    sebep: sebep, 
    kisi: richardinuyesi.displayName, 
    id: cezaID, 
    zaman: muteAtılma,
    bitis: muteBitiş, 
    komut: "CHAT-MUTE" 
    };
  let soncezaaktif = {
    mod: message.member.displayName, 
    sebep: sebep, 
    id: cezaID,  
    durum: `✔️ [AKTIF]`,
    bitis: muteBitiş, 
    komut: "CHAT-MUTE" 
  };
cdb.push(`sicil.${richardinuyesi.id}.${config.server}`, ceza);
cdb.add(`sicilsayi.${richardinuyesi.id}.${config.server}`, +1);
cdb.set(`sonceza.${richardinuyesi.id}.${config.server}`, soncezaaktif);
cdb.add(`cezanumarasi.${config.server}`, +1);
richardinuyesi.roles.add(config.chatmuted)
message.guild.log(cezaID, message.author, richardinuyesi, sebep, muteAtılma, muteBitiş, "chatmute", "penal-log")
//////////
setTimeout(() => {
    message.guild.unlog(cezaID, message.author, richardinuyesi, sebep, muteAtılma, muteBitiş, "chatmute", "penal-log")
    richardinuyesi.roles.remove(config.chatmuted)
    let cezalar = {  mod: message.member.displayName, 
        sebep: sebep, 
        uye: richardinuyesi.id,
        kisi: richardinuyesi.displayName, 
        id: cezaID, 
        durum: `❌ [PASIF]`,
        zaman: muteAtılma,
        bitis: muteBitiş,
        komut: "CHAT-MUTE" 
        };
          cdb.set(`cezalar.${cezaID}.${config.server}`, cezalar);
      
    cdb.set(`sonceza.${richardinuyesi.id}.${message.guild.id}`, { 
mod: message.member.displayName, 
sebep: sebep, 
id: cezaID,  
durum: `❌ [PASIF]`,
bitis: muteBitiş,
komut: "CHAT-MUTE" 
});    
}, ms(zaman))

};

module.exports.config = {
    name: "chatmute",
    aliases: ["chatmute", "cm", "yazilimute", "yazilisustur", "chatsustur", "cmute", "csustur", "csustur"],
    usage: "Taslak",
    description: "Taslak Komutu."
};