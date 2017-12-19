import Vue from 'vue'
import App from './App.vue'
import router from './router.config.js'
import store from './store/index.js'
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
