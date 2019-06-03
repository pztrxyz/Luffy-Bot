const Discord = require('discord.js');
const Porn = require('random-puppy')

exports.run = (bot, msg, args) => {
    if(msg.channel.nsfw == false) return;

    var red = ["porn",'NSFW_Wallpapers',
    'SexyWallpapers',
    'HighResNSFW',
    'nsfw_hd',
    'UHDnsfw','RealGirls',
    'amateur',
    'gonewild','AsianHotties',
    'juicyasians',
    'asianbabes','thiccass','BBW',
    'BBWnudists',
    'BBW_Chubby','tits', 'boobs',    'nsfwcosplay',
    'cosplayonoff',
    'cosporn',
    'cosplayboobs',  'cum',
    'cumshot',
    'anal',
    'oral',
    'teen',
    'tits',
    "milf",
    "creampie",'milf',
    'amateur_milfs',
    'NotTeenNotMilf','naughtyinpublic',
    'gwpublic',
    'exposedinpublic',
    'beachgirls','pussy',
    'rearpussy',
    'simps',
    'vagina',
    'MoundofVenus',
    'PerfectPussies',
    'spreading','NSFW_Snapchat',
    'snapchatgw','MilitaryGoneWild',
    'sexyuniforms'
]
    const random = Math.floor(Math.random() * red.length)
    Porn(red[random]).then(url => {
        var embed = new Discord.RichEmbed()
        .setImage(url)
        msg.channel.send(embed)
    });
}

exports.help = {
    aliases: [],
    name: "porn"
}

exports.conf = {
    restricted: false,
    category: "NSFW"
}