let Recommend = {};

Recommend.playlist = function(cb) {
	let url = config.API.RECOMMEND_RESOURCE;
	request.get(url, {}, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

Recommend.songs = function(cb) {
	let url = config.API.RECOMMEND_SONGS;
	request.get(url, {}, (res)=>{
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

Recommend.FM = function(cb) {
	let url = config.API.FM;
	request.get(url, {}, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

import config from '../config/config.js';
import request from '../utils/request.js';

module.exports = Recommend;