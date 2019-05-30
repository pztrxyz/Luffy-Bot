const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const bot = new Discord.Client({disableEveryone:  true});

bot.login()