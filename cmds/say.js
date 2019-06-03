exports.run = (bot, msg, args) => {
    if(!args) return msg.channel.send(":x: | Please Input An Arguments To Say!")
    msg.channel.send(args.join(" "));
    msg.delete()
}

exports.help = {
    aliases: [],
    name: "say"
}

exports.conf = {
    restricted: false,
    category: "Fun"
}