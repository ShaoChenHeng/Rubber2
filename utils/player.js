// 全局音频播放管理
let PlayerHelper = {};

//获取唯一player, 保持player统一
function get_player() {
	return getApp().globalData.player;
}

PlayerHelper.set_url = function(url) {
	
	url = url || Storage.get_played().url;
	// console.log('set_url:' + url);
	let player = get_player();
	player.setStyles({
		src: url
	});
	
	return;
}

//play前的准备
// PlayerHelper.start = function() {
// 	this.set_url();
// 	let player = get_player();
// 	player.resume();
// 	return;
// }

//统一play入口, 真正的播放入口
PlayerHelper.play = function() {
	let player = get_player();
	player.play(()=>{
		console.log('当前音乐播放完毕');
	},(e)=> {
		console.log(e);
	});;
	return;
}

/**
 * 暂停
 * 需要start后, 触发onPlay事件后, pause才有效
 */
PlayerHelper.pause = function() {
	let player = get_player();
	player.pause();
	return;
}

PlayerHelper.get_position = function() {
	let player = get_player();
	return player.getPosition();
}

PlayerHelper.get_duration = function() {
	let player = get_player();
	
	return player.getDuration();
}

PlayerHelper.seek_to = function(position) {
	return get_player().seekTo(position);
}


/**
 * @param {Object} song_id
 * 传入歌曲id播放
 */
PlayerHelper.start = function(song_id, cb) {
	let player = get_player();
	let played = Storage.get_played();
	
	Song.get_song_detail(song_id, (data)=> {
		let song = data.songs[0];
		let song_name = song.name;
		let cover_image = song.al.picUrl;
		let current_played = played;
		let played_music_id = current_played.id;
		
		if (song_id == played_music_id) {
			// 跳转播放详情页并播放
			let player = get_player();
			if (player.isPaused()) {
				player.play(()=>{},(e)=> {
					
				});;
			}
			// this.turn();
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route;
			if (curRoute != 'pages/play/play') Helper.to('../play/play');
			return;
		}
		
		Song.get_song_url(song_id, (res)=> {
			let url = res.data[0].url;
			if (!url) {
				setTimeout(function() {
					Helper.toast('none', '亲爱的, 暂无该歌曲资源~', 3000, false, 'bottom');
				}, 10);
				return;
			}
	
			let creators = song.ar;
			let creator_str = '';
			
			for (let creator of creators) {
				creator_str = creator_str + creator.name;
			}
			
			let played = {
				id: song_id,
				url: url,
				name: song_name,
				creator: creator_str,
				cover_image: cover_image,
				// time: 0, //上次播放的位置
			}
			
			this.set_url(url);
			
			cb && cb(played);
			
		});
		
	});
}

PlayerHelper.turn = function() {
	console.log('in turn')
	let player = get_player();
	if (player.isPaused()) {
		player.play(()=>{},(e)=> {
			console.log(e);
		});;
	}else {
		player.pause();
	}
	return;
}

PlayerHelper.prev = function(cb) {
	let played = Storage.get_played();
	let playlist = Storage.get_current_playlist();
	let current_song_id = played.id;
	let prev_index = playlist.length - 1;
	
	for (let i = 0; i < playlist.length; i++) {
		if (current_song_id == playlist[i].id) {
			if (i > 0) {
				prev_index = i - 1;
			}
			break;
		}
	}
	
	let prev_song_id = playlist[prev_index].id;
	this.start(prev_song_id, (played)=> {
		cb && cb(played)
	});
}


PlayerHelper.next = function(play_mode, cb) {
	let played = Storage.get_played();
	let current_song_id = played.id;
	let playlist = Storage.get_current_playlist();
	let next_index = 0;
	let current_index = 0;
	for (let i = 0; i < playlist.length; i++) {
		if (current_song_id == playlist[i].id) {
			current_index = i;
		}
	}
	console.log(play_mode);
	if (play_mode == 'single') {
		next_index = current_index;
	} else if (play_mode == 'sequence') {
		if (current_index + 1 >= playlist.length) next_index = 0;
		else next_index = current_index + 1;
	} else if (play_mode == 'random') {
		next_index = Math.round(Math.random()*playlist.length);
	}
	
	console.log(next_index);
	let next_song_id = playlist[next_index].id;
	this.start(next_song_id, (played)=> {
		cb && cb(played)
	});
}

import Storage from '../utils/storage.js'
import Song from '../model/song.js';
import Helper from '../helper/helper.js'

module.exports = PlayerHelper