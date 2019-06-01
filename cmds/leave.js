exports.run = (bot, msg, args) => {
    const vc = msg.member.voiceChannel
    const serverQueue = bot.queue.get(msg.guild.id)
    if(!serverQueue) return msg.channel.send(":x:")
    serverQueue.connection.dispatcher.end()
    vc.leave()
}

exports.help = {
    aliases: ["dc"],
    name: "leave"
}

exports.conf = {
    args: false,
    restricted:false,
    category: "Music"
}