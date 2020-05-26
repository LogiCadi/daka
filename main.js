import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import utils from '@/lib/js/utils'
Vue.prototype.$ = utils

const app = new Vue({
	...App
})
app.$mount()
