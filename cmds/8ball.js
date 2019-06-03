exports.run = (bot, msg, args) => {
    if(!args) return msg.channel.send(`:x: | What You Want To Ask?!`)
    const result = [ "NO!", "YES", "PROBABLY NOT", "MAYBE"];

    const random = Math.floor(Math.random() * result.length);

    msg.channel.send(result[random]);
}

exports.help = {
    aliases: [],
    name: "8ball"
}

exports.conf = {
    restricted: false,
    category: "Fun"
}