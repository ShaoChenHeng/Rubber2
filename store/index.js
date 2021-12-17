import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		played: '', 
		playing: false, // 全局播放状态
		
		play_mode: 'sequence', //single, random, sequence 
		uid: '', //网易云用户id
		user_info: {}, // 网易云用户详情
		subcount: {}, // 各种计数
		likelist: [], //喜欢的歌曲列表ids
		
		current_playlist: [], // 当前播放列表, 应该两种模式, 播放历史和歌曲所在清单
	},
  mutations: {
    set_play_mode(state, mode) {
			state.play_mode = mode;
			Storage.set_play_mode(state.play_mode);
		},
    set_current_playlist(state, item) {
      state.current_playlist.push(item);
			Storage.set_current_playlist(state.current_playlist);
    },
    set_playing(state, playing) {
			state.playing = playing;
		},
    set_played(state, played) {
			state.played = played;
			Storage.set_played(played);
		},
  }
})