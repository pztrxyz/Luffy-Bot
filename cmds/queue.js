const Discord = require('discord.js');

exports.run = (bot, msg, args) => {
    const sQueue = bot.queue.get(msg.guild.id);
    if(!sQueue) return msg.channel.send(":x: | Nothing Play In This Server");
    var embed = new Discord.RichEmbed()
  .setAuthor(`Queue For ${msg.guild.name}`, msg.guild.iconURL)
  .setTitle(`Song Queue`)
  .setDescription(sQueue.songs.map(song  => `**-** ${song.title}`).join(" \n"))
  .addField(`Now Playing`, `**-** __${sQueue.songs[0].title}__`);
  return msg.channel.send(embed);
};

exports.help = {
    aliases: ["q"],
    name: "queue"
};

exports.conf = {
    restricted: false,
    category: "Music"
};