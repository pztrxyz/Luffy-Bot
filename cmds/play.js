const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api');
const Discord = require('discord.js');

exports.run = async(bot, msg, args) => {
    const searchString = args.join(' ');
const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
const youtube = new YouTube(process.env.GOOGLE_KEY);
    const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
          var embed = new Discord.RichEmbed()
          .setTitle("Song Selection")
          .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n \n **Please provide a value to select one of the search results ranging from 1-10.**`);
					msg.channel.send(embed)
          try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
            msg.delete();
						console.error(err);
						return msg.channel.send('No or invalid value entered');
            
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          msg.delete();
				} catch (err) {
					console.error(err);
					return msg.channel.send("Can't Find The Video");
				}
			}
			return handleVideo(video, msg, voiceChannel);
        }
  
  
        //function
        async function handleVideo(video, msg, voiceChannel, playlist = false) {
            const serverQueue = bot.queue.get(msg.guild.id);
            console.log(video);
            const song = {
                id: video.id,
                title: Discord.Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: msg.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                bot.queue.set(msg.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
        
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    bot.queue.delete(msg.guild.id);
                    return msg.channel.send(`I could not join the voice channel: ${error}`);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
                else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
            }
            return undefined;
        }
        
  
  //function
        function play(guild, song) {
            const serverQueue = bot.queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                bot.queue.delete(guild.id);
                return;
            }
            console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { filter: 'audioonly' }))
                .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                    else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        
            serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
        }
}

exports.help = {
    aliases: ["p"],
    name: "play"
}

exports.config = {
    args: true,
    restricted: false,
    category: "Music"
}