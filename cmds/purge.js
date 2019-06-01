exports.run = async(bot, msg, args) => {

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(':x: | You Dont have permission to execute this command')

    const throttle = 2
    const amount = parseInt(args[0])
    if (amount > 100) {
        let messageLeft = amount
        while (messageLeft > 0 ) {
            let messages = await message.channel.fetchMessages({ limit: 100 })
      let cleared = await message.channel.bulkDelete(messages, true)
      msg.channel.send(cleared.size + ' WAS DELETED').then(messages => messages.delete(5000))
      await sleep(throttle * 1000)
      messageleft = messageleft - 100
    }
        } else {
            let messages = await message.channel.fetchMessages({ limit: amount })
    let cleared = await message.channel.bulkDelete(messages, true)
    return msg.channel.send(cleared.size + ' WAS DELETED').then(message => message.delete(5000))
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
    }

    exports.help = {
        aliases: ["prune", "d"],
        name: "purge"
    }

    exports.conf = {
        args: true,
        restricted: false,
        category: "Moderator"
    }