exports.run = (bot, msg, args) => {
    const serverQueue = bot.queue.get(msg.guild.id);
    if(!serverQueue) return msg.channel.send(`:x: | Nothing Play In This Server`);
    serverQueue.connection.dispatcher.end();
    msg.channel.send(`Skip The Current Song`);
};

exports.help = {
    aliases: ["s"],
    name: "skip"
};

exports.conf = {
    restricted: false,
    category: "Music"
};