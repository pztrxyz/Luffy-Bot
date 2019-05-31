module.exports = (bot) => {
    console.log(`Login As [${bot.user.tag}]`);
    bot.user.setPresence({game: {name: `With ${bot.users.size}`, type: "0", url:" "},status: "DND"});
}