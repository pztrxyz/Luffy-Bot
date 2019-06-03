exports.run = (bot, msg, args) => {
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