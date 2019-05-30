const { RichEmbed } = require('discord.js');

exports.run = async(bot, msg, args) => {
    var color = parseInt(args[0])

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

exports.config = {
    args: true,
    restricted: false,
    category: "Utility"
}