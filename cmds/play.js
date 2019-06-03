const { RichEmbed } = require('discord.js');
const { GOOGLE_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const moment = require('moment');

exports.run = async (bot, msg, args) => {

	try{
		const youtube = new YouTube(GOOGLE_KEY);
		
		const vc = msg.member.voiceChannel;
		if(!vc) return msg.channel.send(':x: | Join The Voice Channel First!');
		if(!vc.permissionsFor(bot.user).has(['CONNECT', 'SPEAK'])) return msg.channel.send(':x: | I dont have connect or speak permission');
		if(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/.test(args[0])){
			const playlist = await youtube.getPlaylist(args[0]);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const vid = await youtube.getVideoByID(video.id);
				await handleVideo(vid, msg, vc, true);
			}
      var embed = new RichEmbed()
      .setDescription(`✅ | Playlist: __**${playlist.title}**__ has been added to the queue! [<@${msg.author.id}>]`)
			return msg.channel.send(embed);
		}
		if(/https?:\/\//gi.test(args[0])){
			const video = await youtube.getVideo(args[0]);
			return handleVideo(video, msg, vc);
		}
		const videos = await youtube.searchVideos(args.join(' '), 1);
		if(!videos.length) return msg.channel.send(':x: | No result');
		const video = await youtube.getVideoByID(videos[0].id);
		return handleVideo(video, msg, vc);
	} catch (err) {
		return msg.channel.send(err.stack);
	}


async function handleVideo (video, msg, voiceChannel, playlist = false){
	const queue = bot.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: video.title,
    duration: `${moment(video.durationSeconds*1000).format("mm:ss")}`,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		author: msg.author,
		video
	}
	if(!queue){
		try{
			const thisMess = await msg.channel.send(`Joining ${msg.member.voiceChannel.name}`);
			const connection = await voiceChannel.join();
			const Queue = {
				channel: msg.channel,
				voiceChannel,
				connection,
				songs: [song],
				volume: 100,
				playing: true,
				loop: false
			}
			thisMess.delete(3000);
			bot.queue.set(msg.guild.id, Queue);
			return play(msg, song);
		}catch(e){
			bot.queue.delete(msg.guild.id);
			return msg.channel.send(e.stack);
		}
	}
	queue.songs.push(song);
	if(!playlist) 
    var embed = new RichEmbed()
    .setDescription(`✅ | Add __**${song.title}**__ To Queue [${song.author}]`)
    return msg.channel.send(embed);
}

function play(msg, song){
	const queue = bot.queue.get(msg.guild.id);
	if(!song){
		queue.voiceChannel.leave();
		return bot.queue.delete(msg.guild.id);
	}
	const vid = ytdl(song.url, {filter: 'audioonly' });
	const dispatcher = queue.connection.playStream(vid)
	.on('end', res => {
		const shifed = queue.songs.shift();
		if(queue.loop) queue.songs.push(shifed);
		play(msg, queue.songs[0]);
	})
	.on('error', console.error);
	dispatcher.setVolumeLogarithmic(queue.volume /100);
  var embed = new RichEmbed()
  .setDescription(`🎶 | Now playing **__${song.title}__** **[${song.duration}]**`)
	queue.channel.send(embed);
}
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