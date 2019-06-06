exports.run = (bot, msg, args) => {
    msg.channel.send("**Restarting...**")
    process.exit();
    msg.channel.send("Done");
}

exports.help = {
    aliases: ["reboot"],
    name: "restart"
}

exports.conf = {
    restricted: true,
    category: 'Dev'
}