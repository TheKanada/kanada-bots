const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports.execute = async(client , message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return;
  let data = db.get(`snipe.${message.guild.id}`);
  if(!data) return Functions.embedHata(message.author, message.channel, `Sunucuda Daha Önce Mesaj Silinmemiş.`);
  Functions.embedOlustur(message.author, message.channel, `Yazan Kişi: <@${data.sahip}>
  Mesaj: \`${data.icerik}\`
  Kanal: <#${data.kanal}>`, "RANDOM").then(x => x.delete({timeout: 15000}));
  };

module.exports.config = {
    name: "snipe",
    aliases: [],
    usage: "Taslak",
    description: "Taslak Komutu."
};

/*
const Command = require("../base/Command.js");
const data = require("../models/cezalar.js")
const clientayar = require("../client.json")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const { table } = require('table');
class Cezalar extends Command {
    constructor(client) {
        super(client, {
            name: "cezalar",
            aliases: ["ihlaller"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has(clientayar.jailhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`).then(x => x.delete({ timeout: 10000 }));
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if (!user) return this.client.yolla("Ceza bilgilerine bakmak istediğin kullanıcyı belirtmelisin", message.author, message.channel)
        await data.find({ user: user.id }).sort({ ihlal: "descending" }).exec(async (err, res) => {
            if(!res) return this.client.yolla(`${user} kullanıcısının ceza bilgisi bulunmuyor.`, message.author, message.channel)
            let datax = [
                ["ID", "Tarih", "Ceza", "Sebep"]
            ];

            let dataxe = [
                ["ID", "Ceza", "Tarih", "Bitiş", "Yetkili", "Sebep"]
            ];

            let config = {
                border: {
                    topBody: ``,
                    topJoin: ``,
                    topLeft: ``,
                    topRight: ``,

                    bottomBody: ``,
                    bottomJoin: ``,
                    bottomLeft: ``,
                    bottomRight: ``,

                    bodyLeft: `│`,
                    bodyRight: `│`,
                    bodyJoin: `│`,

                    joinBody: ``,
                    joinLeft: ``,
                    joinRight: ``,
                    joinJoin: ``
                }
            };
            res.map(x => {
                datax.push([x.ihlal, x.tarih, x.ceza, x.sebep])
            })

            res.map(x => {
                dataxe.push([x.ihlal, x.ceza, x.tarih, x.bitiş, this.client.users.cache.get(x.yetkili).tag, x.sebep])
            })

            let out = table(dataxe, config)
            let outi = table(datax.slice(0, 15), config)
            message.channel.send("<@" + user.id + "> kullanıcısının toplam " + datax.length + " cezası bulunmakta son 15 ceza aşağıda belirtilmiştir.Tüm ceza bilgi dosyasını indirmek için 🚫 emojisine, ceza sayılarına bakmak için ❔ emojisine basabilirsin.Tekli bir cezaya bakmak için ``.ceza ID`` komutunu uygulayınız. ```" + outi + "``` ").then(msg => {
                msg.react("🚫").then(async(r) => {
                    await msg.react('❔');
                });
                msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🚫' || reaction.emoji.name == '❔'),
                    { max: 1, time: 30000 }).then(async collected => {
                        if (collected.first().emoji.name == '🚫') {
                            message.channel.send(`${user} kullanıcısının toplam ${datax.length} cezası aşağıdaki belgede yazmaktadır.`, { files: [{ attachment: Buffer.from(out), name: `${user.user.username}_cezalar.txt` }] }).then(msg => {
                                msg.delete({ timeout: 5000 })
                            })
                        } else {
                            let filterArr = res.map(x => (x.ceza))
                            let chatMute = filterArr.filter(x => x == "Chat Mute").length || 0
                            let voiceMute = filterArr.filter(x => x == "Voice Mute").length || 0
                            let jail = filterArr.filter(x => x == "Cezalı").length || 0
                            let ban = filterArr.filter(x => x == "Yasaklı").length || 0
                            let puan = await this.client.punishPoint(user.id)
                            msg.edit("" + user.user.tag + " kullanıcısının ceza bilgileri aşağıda belirtilmiştir:\n\nChat Mute: " + chatMute + " kez.\nSes Mute: " + voiceMute + " kez.\nCezalı Bilgisi: "+ jail + " kez.\nBan Bilgisi: " + ban + " kez.\n\nKullanıcı toplamda " + datax.length + " kez kural ihlali yapmış, kullanıcının ceza puanı "+puan+".", {code: "js"})

                        }
                    })
            })
        })
    }
}

module.exports = Cezalar;
*/