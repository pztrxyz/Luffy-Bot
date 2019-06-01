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
    .addField(`General Information`, "```"+ `ID: ${msg.guild.id} \nVerification Level: ${secure[msg.guild.verificationLevel]} \nCreate At: ${moment(msg.guild.createdTimestamp).format("YYYY-M-D [at] HH:mm:ss")} \nRegion: ${msg.guild.region}` + "```")
    .addField(`Channels`, "```" + `Text: ${msg.guild.channels.filter(ch => ch.type == "text").size} Channels \nVoice ${msg.guild.channels.filter(c => c.type == "voice").size} Channels ` + "```")
    .addField(`Members`, "```" + `Members: ${msg.guild.memberCount} Total \nUsers:${msg.guild.members.filter(m => !m.user.bot).size} \nBots: ${msg.guild.members.filter(mm => mm.user.bot).size} Bots` + "```")
    .addField(`Roles`, "```" + `Total: ${msg.guild.roles.size}, For List Of Roles, use command \`serverroles\``+ "```")
    .addField(`Owner`, "```" + `Name: ${msg.guild.owner.user.tag} \nID: ${msg.guild.owner.id}` + "```")
    .setTimestamp()
    .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
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