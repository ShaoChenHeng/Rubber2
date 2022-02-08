let Other = {};

Other.banner = function(cb) {
	let url = config.API.BANNER;

	request.get(url, {type: 1}, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

// 需登陆后调用
Other.recommend_resource = function(cb) {
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

import config from '../config/config.js';
import request from '../utils/request.js';

module.exports = Other;