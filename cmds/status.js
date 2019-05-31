const { RichEmbed } = require('discord.js');
require('moment')
exports.run = (bot, msg, args) => {
    var embed = new RichEmbed()
    .addField("Connected To", "```"+ `Users: ${bot.users.size} \n Servers: ${bot.guilds.size}`+"```")
    .addField("Usage", "```"+`Uptime: ${(bot.uptime).for}`)
}

exports.help = {
    aliases: ["stats"],
    name: "status"
}

exports.conf = {
    args: false,
    restricted: false,
    category: "Utility"
}