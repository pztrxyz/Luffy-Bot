exports.run = (bot, msg, args) => {
    msg.channel.send(bot.ping)
}

exports.help = {
    aliases: ["pong"],
    name: "ping",
    description: "show ping of the client"
}

exports.config = {
    args: false,
    restricted: false,
    category: "Utility"
}