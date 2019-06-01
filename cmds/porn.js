const Discord = require('discord.js');
const porn = require('pornsearch')

exports.run = (bot, msg, args) => {
    const search = new Porn(args.join(" "))

    search.videos().then(videos => {
        var embed = new Discord.RichEmbed()
        .setImage(videos)
        msg.channel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "porn"
}

exports.conf = {
    args: true,
    restricted: false,
    category: "NSFW"
}