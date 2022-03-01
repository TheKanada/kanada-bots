const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const pdb = new db.table("puanlar")
const cdb = new db.table("cezalar")
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports.execute = async(client , message, args) => {
    if (!message.member.roles.cache.has(config.jailspear) && !message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel, anser.noyt).then(x => x.delete({timeout: 10000}));
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
      Functions.embedBasari(message.author, message.channel, `${richardinuyesi} kullanıcısı **${zamanimiz}** cezalıya atıldı (\`#${cezaID}\`)`)
    
//////////
Functions.cezaEkle(cezaID, richardinuyesi.id, richardinuyesi.displayName, message.member.displayName, message.author.id, "TEMP-JAIL", sebep, zamanimiz, muteAtılma, muteBitiş, "jail")
let ceza = {  
    mod: message.author.id, 
    sebep: sebep, 
    kisi: richardinuyesi.displayName, 
    id: cezaID, 
    zaman: muteAtılma,
    bitis: muteBitiş, 
    komut: "TEMP-JAIL" 
    };
  let soncezaaktif = {
    mod: message.member.displayName, 
    sebep: sebep, 
    id: cezaID,  
    durum: `✔️ [AKTIF]`,
    bitis: muteBitiş, 
    komut: "TEMP-JAIL" 
  };
cdb.push(`sicil.${richardinuyesi.id}.${config.server}`, ceza);
cdb.add(`sicilsayi.${richardinuyesi.id}.${config.server}`, +1);
cdb.set(`sonceza.${richardinuyesi.id}.${config.server}`, soncezaaktif);
cdb.add(`cezanumarasi.${config.server}`, +1);
let roller = richardinuyesi.roles.cache.filter(r => r.name !== "@everyone" && r.id !== config.booster).map(r => r.id)
/*db.set(`jroles.${richardinuyesi.id}`, roller)*/
if(richardinuyesi.voice.channel) richardinuyesi.voice.kick()
richardinuyesi.roles.cache.has(config.booster) ? richardinuyesi.roles.set([config.booster, config.jailed]) : richardinuyesi.roles.set([config.jailed]);
message.guild.log(cezaID, message.author, richardinuyesi, sebep, muteAtılma, muteBitiş, "jail", "penal-log")
//////////
setTimeout(() => {
    message.guild.unlog(cezaID, message.author, richardinuyesi, sebep, muteAtılma, muteBitiş, "jail", "penal-log")
    richardinuyesi.roles.remove(config.jailed)
    richardinuyesi.roles.remove(config.jailed)
    richardinuyesi.roles.add(roller)
    richardinuyesi.roles.add(roller)
    /*    await richardinuyesi.roles.set(db.get(`jroles.${richardinuyesi.id}`))
    await db.delete(`jroles.${richardinuyesi.id}`);  */
    let cezalar = {  mod: message.member.displayName, 
        sebep: sebep, 
        uye: richardinuyesi,
        kisi: richardinuyesi.displayName, 
        id: cezaID, 
        durum: `❌ [PASIF]`,
        zaman: muteAtılma,
        bitis: muteBitiş,
        komut: "TEMP-JAIL" 
        };
          cdb.set(`cezalar.${cezaID}.${config.server}`, cezalar);
      
    cdb.set(`sonceza.${richardinuyesi.id}.${message.guild.id}`, { 
mod: message.member.displayName, 
sebep: sebep, 
id: cezaID,  
durum: `❌ [PASIF]`,
bitis: muteBitiş,
komut: "TEMP-JAIL" 
});    
}, ms(zaman))

};

module.exports.config = {
    name: "jail",
    aliases: ["cezalı", "jail"],
    usage: "Taslak",
    description: "Taslak Komutu."
};