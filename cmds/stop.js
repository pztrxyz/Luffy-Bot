exports.run = (bot, msg, args) => {
    const serverQueue = bot.queue.get(msg.guild.id);
    const vc = msg.member.voiceChannel;
    if(!serverQueue) return msg.channel.send(":x: | Nothing Play In This Server");
    vc.leave();
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    msg.channel.send(`Leave ${vc.name} And Clear The Queue`);
};

exports.help = {
    aliases: ["dc"],
    name: "stop"
};

exports.conf = {
    args: false,
    restricted: false,
    category: "Music"
};