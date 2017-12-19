import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/home.vue'
import Group from '../pages/Group/group.vue'
import Audio from '../pages/Audio/audio.vue'
import Mine from '../pages/Mine/mine.vue'
import Broadcast from '../pages/Broadcast/broadcast.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/audio',
      name: 'Audio',
      component: Audio
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast
    }

  ]
})
