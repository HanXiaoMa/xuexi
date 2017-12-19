import Vue from 'vue'
import App from './App.vue'
import VueRouer from 'vue-router'
import routerConfig from './router.config.js'
import axios from 'axios'
// 使用vue-router,使用全局方法use
Vue.use(VueRouer);

// 创建路由实例
const router = new VueRouer(routerConfig);

// 全局引入axios
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
