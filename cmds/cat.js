const search = require('random-puppy');
const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    search('cat').then(url => {
        var embed = new Discord.RichEmbed()
        .setTitle(`This Your Random Cat`)
        .setURL(url)
        .setImage(url)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
        msg.channel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "cat"
}

exports.conf = {
    restricted: false,
    category: "Fun"
}