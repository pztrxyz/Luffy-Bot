const urban = require('relevant-urban');
const Discord = require('discord.js');

exports.run = async(bot, msg, args) => {
    if(!args.join(" ")) return (":x: | Please INput An Arguments To Search!")
    let res = await urban(args.join(" ")).catch(e => {
        return msg.channel.send(":x: | Word Not Found")
    })

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(res.word)
	    .setURL(res.urbanURL)
	    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
	    .addField('Writer', res.author,true)
	    .addField('Rating', `**\`👍🏻 Upvotes: ${res.thumbsUp} | 👎🏻 Downvotes: ${res.thumbsDown}\`**`)
        .setFooter(`Requested By ${msg.author.username}`, msg.author.displayAvatarURL)
        .setTimestamp()
	   if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
   		embed.addField('Tags', res.tags.join(', '), true) 
   		
   	};
  msg.channel.send(embed)
}

exports.help = {
    aliases: [],
    name: "urban"
}

exports.conf = {
    restricted: false,
    category: "Utility"
}