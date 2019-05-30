const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const bot = new Discord.Client({disableEveryone:  true});

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
bot.login()