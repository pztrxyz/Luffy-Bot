const Discord = require('discord.js')
const porn = require('random-puppy')

exports.run = (bot, msg, args) => {
    if(msg.channel.nsfw == false) return;
    var red = ["NSFW_GIF",
    "nsfw_gifs",
    "porninfifteenseconds",
    "60FPSPorn",
    "porn_gifs",
    "nsfw_Best_Porn_Gif",
    "LipsThatGrip",
    "adultgifs"]

    const sub = Math.floor(Math.random() * red.length)
    porn(red[sub]).then(url => {
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
    args:  false,
    restricted: false,
    category: "NSFW"
}