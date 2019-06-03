const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
    var latency = Date.now() - msg.createdTimestamp;
    var api = bot.ping.toFixed(2);

    var embed = new RichEmbed()
    .setAuthor('Ping')
    .setColor('RANDOM')
    .addField(':speech_balloon: Latency', '`'+`${latency}ms` + '`')
    .addField(':signal_strength: API', '`'+`${api}ms`+'`')
    .setTimestamp()
    .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL);
    msg.channel.send(embed);


};

exports.help = {
    aliases: ["pong"],
    name: "ping",
    description: "show ping of the client"
};

exports.conf = {
    args: false,
    restricted: false,
    category: "Utility"
};