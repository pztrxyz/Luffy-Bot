const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    if (!msg.channel.nsfw) return;
    const Pornsearch = require('pornsearch').default.search(query);
        Pornsearch.gifs(1)
            .then(gifs => {
                let gifrnd = gifs.map(gif => gif.url)
                let embed = new Discord.RichEmbed()
                    .setImage(gifrnd[Math.floor(Math.random() * gifrnd.length)])
                    msg.channel.send(embed);

})
}

exports.help = {
    aliases: ['ph'],
    name: 'pornhub'
}

exports.conf = {
    args: true,
    restricted: false,
    category: "NSFW"
}