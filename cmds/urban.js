const urban = require('relevant-urban');
const Discord = require('discord.js');

exports.run = async(bot, msg, args) => {
    let res = await urban(args.join(" ")).catch(e => {
        return msg.channel.send(":x: | Word Not Found")
    })

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(res.word)
	    .setURL(res.urbanURL)
	    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Contoh:**\n*${res.example}*`)
	    .addField('Writer', res.author,true)
	    .addField('Rating', `**\`👍🏻 Upvotes: ${res.thumbsUp} | 👎🏻 Downvotes: ${res.thumbsDown}\`**`)
	    
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
    args: true,
    restricted: false,
    category: "Utility"
}