import Vue from 'vue';
import App from './App';
import store from './store'


Vue.config.productionTip = false;

App.mpType = 'app'

//重写toast, 将退出应用的提示拦截


const app = new Vue({
    ...App,
	store
})
app.$mount()
