const { Discord, MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const db = new qdb.table("scaryrollog");
module.exports.execute = async(client , message, args) => {
let emb = new MessageEmbed().setFooter(config.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
if (!message.member.hasPermission("ADMINISTRATOR")) return Functions.embedHata(message.author, message.channel`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({timeout: 10000}));
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!kullanici) return Functions.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${config.prefix || '.'}rollog @üye\``).then(x => x.delete({timeout: 10000}));
let LOGGGGGGGG = db.get(`rollogu.${kullanici.id}_qwe`);
if (!LOGGGGGGGG) { Functions.embedBasari(message.author, message.channel, `${kullanici} Kişisinin rol geçmişi temiz.`) 
}
let miktar = db.get(`rolsayi_${kullanici.id}`);
let rollugummmmm = LOGGGGGGGG.length > 0 ? LOGGGGGGGG.map((value, index) => `${value.emoji} Rol ${value.roldurum}. Rol: <@&${value.verilenrol}> Yetkili:<@${value.yetkili}>
Tarih: ${value.tarih}`).join("\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n") : "Bu Üyenin Rol Geçmişi Bulunamadı.";

client.embedGenislet(`${kullanici} kişisinin toplamda ${miktar || `0`} rol bilgisi bulunmakta son ${miktar || `0`} rolün bilgileri aşağıda belirtilmiştir.

${rollugummmmm}`,
                   {name: `${message.member.displayName}`, icon: message.author.avatarURL({dynamic: true})},
                   {name: config.footer, icon: false},                 
                    {setColor: ["RANDOM"]}).then(list => {               
                  list.forEach(item => {
             message.channel.send(item);
})
});
  };

module.exports.config = {
    name: "rollog",
    aliases: [],
    usage: "Taslak",
    description: "Taslak Komutu."
};