const { exec } = require('child_process');

exports.run = (bot, msg, args) => {
    try {
        exec(args.join(" "), (error, output) => {
            if(!error) return msg.channel.send(output, { code: 'diff'})
            return msg.channel.send(error, {code: "ini"})
        });

    } catch(err) {
        return msg.chanel.send(err.stack)
    }
}

exports.help = {
    aliases: ["ex", "$"],
    name: "exec"
}

exports.conf = {
    args: true,
    restricted: true,
    category: "Dev"

}