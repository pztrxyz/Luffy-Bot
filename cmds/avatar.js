const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
    const mention = msg.mentions.users.first() || bot.users.get(args[0])

    if(!mention) {
        var embed = new RichEmbed()
        .setAuthor("Your Avatar", msg.author.displayAvatarURL)
        .setDescription(`[URL](${msg.author.avatarURL})`)
        .setImage(msg.author.displayAvatarURL)
        msg.channel.send(embed)
    } else {
        var userembed = new RichEmbed()
        .setAuthor(`${mention.username}'s Avatar`, mention.displayAvatarURL)
        .setDescription(`[URL](${mention.avatarURL})`)
        .setImage(mention.displayAvatarURL)
        msg.channel.send(userembed)
    }
}

exports.help = {
    aliases: ["ava"],
    name: "avatar"
}

exports.config = {
    category: "Utility"
}