const Discord = require('discord.js')
const ytdl = require('discord.js')
const Youtube = require('simple-youtube-api')

exports.run = async(bot, msg, args) => {

}

exports.help = {
    aliases: ["p"],
    name: "play"
}

exports.conf = {
    args: true,
    restricted: false,
    category: "Music"
}