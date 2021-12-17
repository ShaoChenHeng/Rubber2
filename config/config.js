const HOST = 'https://netease-cloud-music-api-teal-tau.vercel.app/';
const systemInfo = uni.getSystemInfoSync();
const status_bar_height = systemInfo.statusBarHeight;


const API = {};

// 获取歌曲的url
API.SONG = 'song/url'
// 获取歌曲的歌词
API.LYRIC = 'lyric';
// 获取歌曲的详细信息
API.SONG_DETAIL = 'song/detail';


export default {
	systemInfo, 
	status_bar_height,
	HOST,
	API
}
