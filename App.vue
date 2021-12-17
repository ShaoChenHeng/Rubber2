<script>
	import Storage from '@/utils/storage.js';
	import song from '@/model/song.js';
	import PlayerHelper from '@/utils/player.js';
	export default {
		globalDate: {
			first_play: true,
			player: {},
		},
		onLaunch: function() {
			console.log('App Launch')

			const dom = weex.requireModule('dom');
			dom.addRule('fontFace', {
				'fontFamily': "weexUiIconFont",
				'src': "url( \'http://at.alicdn.com/t/font_1211227_midl7sqf2t8.ttf\')"
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
