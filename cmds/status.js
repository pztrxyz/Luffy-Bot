const { version, RichEmbed } = require('discord.js');
const moment = require('moment');
const os = require('os');
const cpu = require('cpu-stat');


exports.run = (bot, msg, args) => {
    cpu.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
    
    var embed = new RichEmbed()
    .setColor("RANDOM")
    .addField("Connected To", "```"+ `Users: ${bot.users.size} \nServers: ${bot.guilds.size} \nChannels: ${bot.channels.size}`+"```")
    .addField("Usage", "```"+`Uptime: ${moment(bot.uptime).format(" D [days] H [hours] S [Seconds]")} \nMemory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB \nCpu: ${percent.toFixed(2)}%`+ "```")
    .addField(`System`, "```"+`CPU: ${os.cpus().map(i => `${i.model}`)[0]} \nArch: ${os.arch()} \nPLatform: ${os.platform()} \nNodejs: ${process.version} \nDiscord.js: v${version}`+"```")
    .setTimestamp()
    .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
   msg.channel.send(embed);
    })
}

exports.help = {
    aliases: ["stats"],
    name: "status"
}

exports.conf = {
    args: false ,
    restricted: false,
    category: "Utility"
}