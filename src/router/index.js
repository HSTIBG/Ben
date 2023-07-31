import Vue from 'vue'
 import VueRouter from 'vue-router'
Vue.use(VueRouter)



import Login from '@/pages/Login.vue'
import Content from '@/pages/content.vue'
import home from '@/pages/home.vue'
import xinxi from '@/pages/xinxi.vue'
import xueke from '@/pages/xueke.vue'
import zhuanye from '@/pages/zhuanye.vue'
import firstCategory from '../pages/firstCategory.vue'
import bbt from '../pages/bbt.vue'
import bba from '../pages/bba.vue'
import bbb from '../pages/bbb.vue'
import xuanz from '../pages/xuanz.vue'



const routes = [
	{
		path:'/',
		component:xuanz
	},
	{
		path:'/bbb',
		component:bbb
	},
	{
		path:'/Login',
		component:Login
	},
	{
		path:'/content',
		name: "content",
		component:Content,
		
		children:[
			{
				path:'/',
				component:home
			},
			{
				path:'/home',
				component:home
			},
			{
				path:'/xinxi',
				component:xinxi
			},
			{
				path:'/xueke',
				component:xueke
			},
			{
				path:'/zhuanye',
				component:zhuanye
			},
			{
				path:'/firstCategory',
				component:firstCategory
			},
			{
			 	path:'/bbt',
				component:bbt
			},
			 {
				path:'/bba',
			   component:bba
			}
		]
	}
 ]

const router = new VueRouter({
	routes
})

export default router