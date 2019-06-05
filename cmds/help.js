const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    const utility = bot.commands.filter(c => c.conf.category == "Utility").map(co => co.help.name);
    const fun = bot.commands.filter(c => c.conf.category == "Fun").map(co => co.help.name);
    const nsfw = bot.commands.filter(c => c.conf.category == "NSFW").map(co => co.help.name);
    const core = bot.commands.filter(c => c.conf.category == "Core").map(co => co.help.name);

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
    .addField("Utility", `${utility.join(", ")}`)
    .addField("Fun", `${fun.join(", ")}`)
    .addField("NSFW", `${nsfw.join(", ")}`)
    .addField("Core", `${core.join(", ")}`)
    .addField("Music", "For music commands use `helpmusic`");
    msg.channel.send(embed);
}

exports.help = {
    aliases: ["h"],
    name: "help"
}

exports.conf = {
    restricted: false,
    category: "Core"
}