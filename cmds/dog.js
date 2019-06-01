const dog = require('random-puppy');
const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    dog().then(url => {
        var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("This Your Random Dog")
        .setURL(url)
        .setImage(url)
        .setTimestamp()
        .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
        msg.channel.send(embed)
    })
}

exports.help = {
    aliases: [],
    name: "dog"
}

exports.conf = {
    args: false,
    restricted: false,
    category: "Fun"
}