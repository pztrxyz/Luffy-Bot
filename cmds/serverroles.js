const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    const roles = msg.guild.roles.map(r => `${r.name}`);
    var e = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name} Roles`, msg.guild.iconURL)
    .addField("Roles", roles.join(' \n '), true)
    .addField("Total", roles.length);
    msg.channel.send(e);
};

exports.help = {
    aliases: ["sr", "roles"],
    name: "serverroles"
};

exports.conf = {
    args: false,
    restricted: false,
    category: "Utility"
};