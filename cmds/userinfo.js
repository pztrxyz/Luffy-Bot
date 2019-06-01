const Discord = require('discord.js');
const moment = require('moment');

exports.run = (bot, msg, args) => {
    var mention = msg.mentions.members.first() || msg.guild.members.get(args[0])
    const type = {
        true: "Bot", false: "Human"
    }

    if(!mention) {
        var uembed = new Discord.RichEmbed()
        .setAuthor("RANDOM")
        .setAuthor(`Info Of ${msg.author.tag}`, msg.author.displayAvatarURL)
        .setThumbnail(msg.author.displayAvatarURL)
        .addField(`General Information`, "```"+ `Tag: ${msg.author.tag} \nid: ${msg.author.id}, \ntype: ${type[msg.author.bot]} \ncreatedAt: ${moment(msg.author.createdTimestamp).format("YYYY - M - D [at] HH:mm:s")}` + "```" + `\navatarURL: [CLICK ME](${msg.author.avatarURL}) \nMention: <@${msg.author.id}>`)
        .addField(`Status`, "```"+`Status: ${msg.author.presence.status} \nGame: ${msg.author.presence.game}`+ "```")
        .addField(`Member Info`, "```"+`Joined At: ${moment(msg.member.joinedTimestamp).format("YYYY - M - D [at] HH:mm:s")} \nRoles: ${msg.member.roles.size}` + "```")
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL)
        msg.channel.send(uembed)

    } else {
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`Info Of ${mention.user.tag}`, mention.user.displayAvatarURL)
        .setThumbnail(mention.user.displayAvatarURL)
        .addField(`General Information`, "```"+ `Tag: ${mention.user.tag} \nid: ${mention.id}, \ntype: ${type[mention.user.bot]} \ncreatedAt: ${moment(mention.user.createdTimestamp).format("YYYY - M - D [at] HH:mm:s")}` + "```" + `\navatarURL: [CLICK ME](${mention.user.avatarURL}) \nMention: <@${mention.id}>`)
        .addField(`Status`, "```"+`Status: ${mention.presence.status} \nGame: ${mention.presence.game}`+ "```")
        .addField(`Member Info`, "```"+`Joined At: ${moment(mention.joinedTimestamp).format("YYYY - M - D [at] HH:mm:s")} \nRoles: ${mention.roles.size}` + "```")
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL)
        msg.channel.send(embed)
    }

}

exports.help = {
    aliases: ["ui", "user"],
    name: "userinfo"
}

exports.conf = {
    restricted: false,
    category: "Utility"
}