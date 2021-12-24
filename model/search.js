let Search = {};

// 获取排行榜
Search.get_hot_list = function(cb) {
	let url = config.API.HOT_SEARCH;

	request.get(url, {}, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

// 获取最新歌曲（单曲）
Search.get_new_songs = function(cb) {
	let url = config.API.NEW_SONGS;

	request.get(url, {}, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		} else {
			console.log('failed');
		}
	})
}

// 获取热门专辑

/* limit: 取出数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
type : new:全部 hot:热门,默认为 new
year : 年,默认本年
month : 月,默认本月 */
Search.get_top_albums = function(cb, limit, offset, area, type) {
	let url = config.API.TOP_ALBUM;
	limit = limit 	|| 20;
	offset = offset || 0;
	area = area 	|| 'ALL';
	type = type 	|| 'hot';
	
	let params = {
		limit: limit,
		offset: offset,
		area: area,
		type: type
	}
	request.get(url, params, (res)=> {
		let data = res.data
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

/**
 * 单项搜索
 * 此接口post方式有问题, 分页参数无效
 * 
 * 必选参数: 
 * keywords: 关键词
 * 
 * 可选参数: 
 * limit : 返回数量 , 默认为 30 
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
Search.search = function(keyword, type, page, cb) {
	let url = config.API.SEARCH;
	let limit = 30;
	let offset = page * limit;
	type = type || 1;
	let params = {
		keywords: keyword,
		limit: limit,
		offset: offset,
		type: type
	}
	request.get(url, params, (res)=> {
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

module.exports = Search;