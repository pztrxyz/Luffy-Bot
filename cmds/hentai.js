const search = require('random-puppy');
const Discord = require('discord.js')

exports.run = (bot, msg, args) => {
    if(!msg.channel.nsfw) return;

    var subreddits = [
        'HENTAI_GIF',
        'hentai_irl'
    ]

    const random = Math.floor(Math.random() * subreddits.length)

    search(subreddits[random]).then(url => {
        var embed =  new Discord.RichEmbed()
        .setImage(url)
        msg.chnanel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "hentai"
}

exports.conf = {
    args: false,
    restricted: false,
    category: "NSFW"
}