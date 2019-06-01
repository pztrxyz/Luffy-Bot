const Discord = require('discord.js');
const moment =  require('moment');

exports.run = (bot, msg, args) => {
    const secure = {
        0 : "None",
        1 : "Low",
        2 : "Medium",
        3 : "(╯°□°）╯︵ ┻━┻",
        4 : "(ノಠ益ಠ)ノ彡┻━┻"
    }

    var embed = new Discord.RichEmbed()
    .setAuthor(`Info Of ${msg.guild.name}`, msg.guild.displayIconURL)
    .setColor("RANDOM")
    .setThumbnail(msg.guild.iconURL)
    .addField(`General Information`, "```"+ `ID: ${msg.guild.id} \nVerification Level: ${secure[msg.guild.verificationLevel]} \n Create At: ${moment(msg.guild.createdTimestamp).format("YYYY-mm-dd [at] HH:mm:ss")} \nRegion: ${msg.guild.region}` + "```")
    .addField(`Channels & Members`, "```" + `Channels: ${msg.guild.channels.filter(ch => ch.type == "text").size} Text And ${msg.guild.channels.filter(c => c.type == "voice").size} Voice Channels \nMembers: ${msg.guild.memberCount} Total, ${msg.guild.members.filter(m => !m.user.bot).size} Users & ${msg.guild.members.filter(mm => mm.user.bot).size} Bots` + "```")
    msg.channel.send(embed)
}

exports.help = {
    aliases: ["si", "server"],
    name: "serverinfo"
}

exports.conf = {
    args: false,
    restricted: false,
    category: "Utility"
}