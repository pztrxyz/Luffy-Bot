require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const queue = new Discord.Collection();
const bot = new Discord.Client({disableEveryone:  true});

bot.queue = queue;
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
    try {
        if (msg.author.bot) return;
        if (msg.content.indexOf(config.prefix) !== 0) return;
              const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
              let command = args.shift().toLowerCase();
      
              if (bot.aliases.has(command)) command = bot.commands.get(bot.aliases.get(command)).help.name
      
              if (bot.commands.get(command).config.restricted == true) {
                if (msg.author.id !== config.owner) return msg.channel.send('This Command For My Owner');
              }
              if (bot.commands.get(command).config.args == true) {
                  if (!args[0]) return msg.channel.send(`Invalid arguments. Use: ${config.prefix + 'help ' + bot.commands.get(command).help.name}`)
              }
      
              let commandFile = require(`./cmds/${command}.js`);
              commandFile.run(bot, msg, args);
      } catch (err) {
        console.error(err)
      }
})
bot.login(process.env.token)