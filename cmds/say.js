exports.run = (bot, msg, args) => {
    msg.channel.send(args.join(" "));
}

exports.help = {
    aliases: [],
    name: "say"
}

exports.config = {
    args: true,
    restricted: false,
    category: "Fun"
}