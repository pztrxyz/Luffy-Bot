const meme = require('memejs');
const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    meme(function(data, error) {
        var embed = new Discord.RichEmbed()
        .setTitle(data.title[0])
        .setURL(data.url[0])
        .setColor("RANDOM")
        .setTimestamp()
        .setImage(data.url[0])
        .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
        msg.channel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "meme"
}

exports.conf = {
    args: false,
    restricted: false,
    category: "Fun"
}