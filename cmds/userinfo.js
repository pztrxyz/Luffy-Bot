const Discord = require('discord.js');
const moment = require('moment');

exports.run = (bot, msg, args) => {
    var mention = msg.mentions.members.first() || msg.guild.members.get(args[0])
    const type = {
        true: "Bot", false: "Human"
    }

    if(!mention) {
        var uembed = new Discord.RichEmbed()
        .setAuthor(`Info Of ${msg.author.tag}`, msg.author.displayAvatarURL)
        .setThumbnail(msg.author.displayAvatarURL)
        .addField(`General Information`, "```"+ `Tag: ${msg.author.tag} \nid: ${msg.author.id}, \ntype: ${type[msg.author.bot]} \ncreatedAt: ${moment(msg.author.createdTimestamp).format("YYYY - M - D [at] HH:mm:s")}` + "```" + `\navatarURL: [CLICK ME](${msg.author.avatarURL}) \nMention: <@${msg.author.id}>`)
        .addField(`Status`, "```"+`Status: ${msg.author.presence.status} \nGame: ${msg.author.presence.game}`+ "```")
        .addField(`Member Info`, "```"+`Joined At: ${moment(msg.member.joinedTimestamp).format("YYYY - M - D [at] HH:mm:s")} \nRoles: ${msg.member.roles.size}` + "```")
        msg.channel.send(uembed)

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