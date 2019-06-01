exports.run = (bot, msg, args) => {
    msg.channel.send(`**Restarting...**`)
    .then(msdg => bot.destroy)
    .then(() => bot.login(process.env.token))
    .then(message => message.channel.send('Restart Successfully'));
}

exports.help = {
    aliases: "reboot",
    name: "restart"
}

exports.conf = {
    args: true,
    restricted: true,
    category: 'Dev'
}