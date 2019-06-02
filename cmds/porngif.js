const Discord = require('discord.js')
const porn = require('random-puppy')

exports.run = (bot, msg, args) => {
    porn('porn-gif').then(url => {
        var embed = new Discord.RichEmbed()
        .setImage(url)
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