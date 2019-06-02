const Discord = require('discord.js')
const porn = require('pornsearch')

exports.run = (bot, msg, args) => {
    const search = new porn(args.join(" "))

    search.gifs().then(gif => {
        var embed = new Discord.RichEmbed()
        .setImage(gif)
        msg.channel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "porngif"
}

exports.conf ={
    args:  true,
    restricted: false,
    category: "NSFW"
}