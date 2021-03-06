const { RichEmbed } = require('discord.js');

exports.run = async(bot, msg, args) => {
    try {
        let codein = args.join(" ")
        let code = eval(codein)

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new RichEmbed()
        .setColor("RANDOM")
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        .setFooter('⏱️ | ' + (Date.now() - msg.createdTimestamp).toLocaleString() + " ms")
        msg.channel.send(embed)
    } catch(e) {
      let codein = args.join(" ")
      let time = (Date.now() - msg.createdTimestamp).toLocaleString();
      var embedd = new RichEmbed()
      .setColor('RED')
      .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
      .addField(':interrobang: Error', `\`\`\`js\n${e}\n\`\`\``)
      .setFooter(`⏱️ | ${time}ms`)
        msg.channel.send(embedd);
    }
}

exports.help = {
    aliases: ["e", "ev"],
    name: "eval"
}

exports.conf = {
    restricted: true,
    category: "Devs"
}