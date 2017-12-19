import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Classify from './components/Classify.vue'
import ShopCart from './components/ShopCart.vue'
import Person from './components/Person.vue'
import Details from './components/details.vue'

Vue.use(VueRouter);

export default new VueRouter({
	routes:[
		{path:'/home',component:Home},
		{path:'/classify',component:Classify},
		{path:'/shopcart',component:ShopCart},
		{path:'/person',component:Person},
		{path:'/details',component:Details},
		{path:'/',redirect:'/home'}
	]
});