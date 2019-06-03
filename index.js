require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const bot = new Discord.Client({disableEveryone:  true});

bot.queue = new Discord.Collection();
bot.afk = new Discord.Collection();
bot.events = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./cmds/", (error, files) => {
    if(error) return console.error();
    files.forEach(f => {
        let props = require(`./cmds/${f}`);
        props.fileName = f;
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
})

//events handler
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

bot.on("message", async(msg) => {
  const config = require('./config.json')
    try {
        if (msg.author.bot) return;
        if (msg.content.includes(msg.mentions.users.first())) {
          let mentioned = bot.afk.get(msg.mentions.users.first().id);
          var afkembed = new Discord.RichEmbed()
          if (mentioned) msg.channel.send(`**${mentioned.usertag}** Is Currently AFK. Reason: ${mentioned.reason}`);
      }
      let afkcheck = bot.afk.get(msg.author.id);
      if (afkcheck) return [bot.afk.delete(msg.author.id), msg.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000))];
  
        if (msg.content.indexOf(config.prefix) !== 0) return;
              const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
              let command = args.shift().toLowerCase();
      
              if (bot.aliases.has(command)) command = bot.commands.get(bot.aliases.get(command)).help.name
      
              if (bot.commands.get(command).conf.restricted == true) {
                if (msg.author.id !== config.owner) return msg.channel.send('This Command For My Owner');
              }
      
              let commandFile = require(`./cmds/${command}.js`);
              commandFile.run(bot, msg, args);
      } catch (err) {
        console.error(err)
      }
})
bot.login(process.env.token)