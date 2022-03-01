const {Guild, Discord, MessageEmbed} = require('discord.js');
const db = require("quick.db")
const pdb = new db.table("puanlar")
const cdb = new db.table("cezalar")
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");

class Functions {
////////////// EMBED KATEGORİSİ //////////////
static botEmbed(kanal, aciklama, color) {
  return kanal.send(new MessageEmbed()
.setDescription(aciklama)
.setColor(color)
.setFooter(config.footer));

}   
static embedOlustur(uye, kanal, aciklama, color) {
    return kanal.send(new MessageEmbed()
.setDescription(aciklama)
.setColor(color)
.setFooter(config.footer)
.setAuthor(uye.tag, uye.avatarURL({ dynamic: true, size: 2048 })));

  }   
  static embedBasari(uye, kanal, aciklama) {
   return kanal.send(new MessageEmbed()
   .setDescription(aciklama)
   .setColor("#00ff00")
   .setFooter(config.footer)
   .setAuthor(uye.tag, uye.avatarURL({dynamic: true, size: 2048}))); 
  }
  static embedHata(uye, kanal, aciklama) {
    return kanal.send(new MessageEmbed()
.setDescription(aciklama)
.setColor("#ff0000")
.setFooter(config.footer)
.setAuthor(uye.tag, uye.avatarURL({ dynamic: true, size: 2048 })));
  }   
////////////// EMBED KATEGORİSİ //////////////

////////////// CEZA KATEGORİSİ //////////////
static cezaEkle(cezanumarasi, uye, uyename, yetkili, yetkiliid, tur, sebep, sure, as, bz, veritipi) {
  let server = config.server;
  let cezalar = {  mod: yetkili, 
  sebep: sebep, 
  uye: uye,
  kisi: uyename, 
  id: cezanumarasi, 
  durum: `✔️ [AKTIF]`,
  zaman: as,
  bitis: bz, 
  komut: tur 
  };
    cdb.set(`cezalar.${cezanumarasi}.${server}`, cezalar);

    if(veritipi === "chatmute") {
pdb.add(`cezapuan.${uye.id}.${server}`, +10);
pdb.add(`cezasayi.${uye.id}.${server}`, +1);
let puan = pdb.get(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(config.server).puanlog(yetkiliid, uye, puan, "chatmute", "puan-log")
    } else if(veritipi === "voicemute") {
pdb.add(`cezapuan.${uye.id}.${server}`, +10);
pdb.add(`cezasayi.${uye.id}.${server}`, +1);
let puan = pdb.get(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(config.server).puanlog(yetkiliid, uye, puan, "voicemute", "puan-log")
    } else if(veritipi === "jail") {
pdb.add(`cezapuan.${uye.id}.${server}`, +20);
pdb.add(`cezasayi.${uye.id}.${server}`, +1);
let puan = pdb.get(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(config.server).puanlog(yetkiliid, uye, puan, "jail", "puan-log")
    } else if(veritipi === "ban") {
pdb.add(`cezapuan.${uye.id}.${server}`, +60);
pdb.add(`cezasayi.${uye.id}.${server}`, +1);
let puan = pdb.get(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(config.server).puanlog(yetkiliid, uye, puan, "ban", "puan-log")
    } else if(veritipi === "warn") {
pdb.add(`cezapuan.${uye.id}.${server}`, +5);
pdb.add(`cezasayi.${uye.id}.${server}`, +1);
let puan = pdb.get(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(config.server).puanlog(yetkiliid, uye, puan, "warn", "puan-log")
    } 
}
static botCezaEkle(cezanumarasi, uye, uyename, tur, sebep, as, bz, veritipi) {
  let server = config.server;

  let cezalar = {
  mod: "CHATGUARD",
  sebep: sebep, 
  uye: uye,
  kisi: uyename, 
  id: cezanumarasi, 
  durum: `✔️ [AKTIF]`,
  zaman: as,
  bitis: bz, 
  komut: tur 
  };
    cdb.set(`cezalar.${cezanumarasi}.${server}`, cezalar);

    if(veritipi === "chatmute") {
pdb.add(`cezapuan.${uye.id}.${server}`, +10);
    } else if(veritipi === "voicemute") {
pdb.add(`cezapuan.${uye.id}.${server}`, +10);
    } else if(veritipi === "jail") {
pdb.add(`cezapuan.${uye.id}.${server}`, +20);
    } else if(veritipi === "ban") {
pdb.add(`cezapuan.${uye.id}.${server}`, +60);
    } else if(veritipi === "warn") {
pdb.add(`cezapuan.${uye.id}.${server}`, +5);
    } 
}
////////////// CEZA KATEGORİSİ //////////////

}
module.exports = Functions;
