const { RichEmbed } = require('discord.js');

exports.run = async(bot, msg, args) => {
    if(!args) return msg.channel.send(`:x: | Please Input An Arguments To Say`);
    var color = parseInt(args[0]);

    if(!color) {
    var embed = new RichEmbed()
    .setDescription(args.join(" "))
    msg.channel.send(embed)
} else {
    var content = args.slice(1).join(' ');
    var embed2 = new RichEmbed()

    .setColor(args[0])
    .setDescription(content)
    msg.channel.send(embed2);
}
}

exports.help = {
    aliases: ["em"],
    name: "embed"
}

exports.conf = {
 restricted: false,
 category: "Fun"
}