exports.run = (bot, msg, args) => {
    const vc = msg.member.voiceChannel
    const serverQueue = bot.queue.get(msg.guild.id)
    if(!serverQueue) return msg.channel.send(":x:")
    serverQueue.connection.dispatcher.end()
    vc.leave()
}