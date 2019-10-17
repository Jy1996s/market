// 引入核心库
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios


import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'
import './assets/styles/common.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
