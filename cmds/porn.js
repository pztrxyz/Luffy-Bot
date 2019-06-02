const Discord = require('discord.js');
const Porn = require('random-puppy')

exports.run = (bot, msg, args) => {
    Porn('porn').then(url => {
        var embed = new Discord.RichEmbed()
        .setImage(url)
        msg.channel.send(embed)
    });
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