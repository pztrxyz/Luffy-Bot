exports.run = (bot, msg, args) => {
    const reason = args.join(" ") ? args.join(" ") : "No Reason Set"
    let afk = bot.afk.get(msg.author.id);

    if(!afk) {
    let construct = {
        usertag: msg.author.tag,
        id: msg.author.id,
        reason: reason
    }
    
    bot.afk.set(msg.author.id, construct);
    return msg.channel.send(`${msg.author.username} is afk. Reason: ${reason}`);
}
};

exports.help = {
    aliases: [],
    name: "afk"
};

exports.conf  = {
    restrited: false,
    category: "utility"
}