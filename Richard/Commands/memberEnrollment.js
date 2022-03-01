const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const pdb = new db.table("puanlar")
const cdb = new db.table("cezalar")
require("moment-duration-format");
require("moment-timezone");
module.exports.execute = async(client , message, args) => {
 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(config.footer).setColor("RANDOM");
    let uyemiz = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      let sicilsayi = cdb.get(`sicilsayi.${uyemiz.id}.${config.server}`);
   let soncezainfo = cdb.get(`sonceza.${uyemiz.id}.${config.server}`);
        let sicilminerdelanit = cdb.get(`sicil.${uyemiz.id}.${config.server}`);
     if (!sicilminerdelanit) return Functions.embedHata(message.author, message.channel, `**${message.guild.name}** sunucusunda kayıtlı ${uyemiz} kullanıcısının sicil kayıdı bulunmuyor.`)

    let sicilinfo = cdb.get(`sicil.${uyemiz.id}.${config.server}`);
   
  let sicilimm = sicilinfo.length > 0 ? sicilinfo.map((value, index) => ` **[${value.komut}]** \`${value.zaman}\` tarihinde **${value.sebep}** nedeniyle <@${value.mod}> tarafından cezalandırıldı. **#${value.id}**`).join("\n") : ""

  if(sicilsayi >= 7) {
    const filter = (reaction, user) => {
        return [emojis.onayemoji].includes(reaction.emoji.id) && user.id === message.author.id; 
        };

       message.channel.send(embed.setDescription(`**${message.guild.name}** sunucusunda kayıtlı ${uyemiz} kullanıcısının **7'den fazla** cezası bulunduğu için son cezası gösterilmekterdir,
\`\`\`cs
                [Kullanıcının Son Cezası]
> Ceza ID => #${soncezainfo.id}
> Ceza Durumu => ${soncezainfo.durum}
> Yetkili => ${soncezainfo.mod}
> Tür => ${soncezainfo.komut}
> Sebep => ${soncezainfo.sebep}
> Bitiş Tarihi => ${soncezainfo.bitis}
\`\`\``).setFooter(`Kullanıcının bütün sicilini görmek için tepkiye tıklayabilirsin.`))
.then(x => {
            x.react(emojis.onayemoji);
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
                  x.delete()
                        client.embedGenislet(`**${message.guild.name}** sunucusunda kayıtlı ${uyemiz} kullanıcısının tüm cezaları aşağıda listenmiştir,

${sicilimm}`,
                   {name: `${message.member.displayName}`, icon: message.author.avatarURL({dynamic: true})},
                   {name: config.footer, icon: false},                 
                    {setColor: ["RANDOM"]}).then(list => {               
                  list.forEach(item => {
             message.channel.msend(item);
})
});

                };
            });
        });

   } else {

  message.channel.send(embed.setDescription(`**${message.guild.name}** sunucusunda kayıtlı ${uyemiz} kullanıcısının tüm cezaları aşağıda listenmiştir,

${sicilimm}`));
}
  };

module.exports.config = {
    name: "sicil",
    aliases: ["enrollment"],
    usage: "Taslak",
    description: "Taslak Komutu."
};