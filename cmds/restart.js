exports.run = (bot, msg, args) => {
    msg.channel.send("**Restarting...**")
    bot.destroy().then(() => bot.login(process.env.token));
    msg.channel.send("Done");
}

exports.help = {
    aliases: ["reboot"],
    name: "restart"
}

exports.conf = {
    args: false,
    restricted: true,
    category: 'Dev'
}