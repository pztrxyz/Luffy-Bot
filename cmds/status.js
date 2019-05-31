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
    .addField("Connected To", "```"+ `Users: ${bot.users.size} \n Servers: ${bot.guilds.size}`+"```")
    .addField("Usage", "```"+`Uptime: ${moment(bot.uptime).format(" D [days] H [hours] S [Seconds]")} \n Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB \n Cpu: ${percent.toFixed(2)}%`+ "```")
    .addField(`System`, "```"+`CPU: ${os.cpus().map(i => `${i.model}`)[0]} \n Arch: ${os.arch()} \n PLatform: ${os.platform()} \n Nodejs: ${process.version} \n Discord.js: v${version}`+"```") 
    msg.channel.send(embed);
    })
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