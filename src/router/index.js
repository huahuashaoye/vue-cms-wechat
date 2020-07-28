import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'


//左侧导航栏点击两下报错，解决方法
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}



//页面级组件
import Layout from '@/components/Layout.vue'

const routes = [
	//登录
	{
		path: '/login',
		//起别名,项目跳转主页
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue')

	},
	//注册
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue')
	},
	//商品路由
	{
		path: '/commodity/',
		name: 'Commodity',
		component: Layout,
		//commodity开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'CommodityList',
				component: () => import('@/views/Commodity/List.vue')

			},
			{
				path: 'release',
				name: 'CommodityRelease',
				component: () => import('@/views/Commodity/Release.vue')

			},
			{
				path: 'edit/:id',
				name: 'CommodityEdit',
				component: () => import('@/views/Commodity/Edit.vue'),
				props:true
				
			},
			{
				path: 'Category',
				name: 'CommodityCategory',
				component: () => import('@/views/Commodity/Category.vue')

			},
		]
	},
	{
		path: '/Admin/',
		name: 'Admin',
		component: Layout,
		//Admin开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
	
			},
			{
				path: 'information',
				name: 'AdminInformation',
				component: () => import('@/views/Admin/Information.vue')
	
			},
			{
				path: 'edit',
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue')
				
			},
	// 		{
	// 			path: 'Category',
	// 			name: 'AdminCategory',
	// 			component: () => import('@/views/Admin/Category.vue')
	
	// 		},
		]
	},
	{
		path: '/Menu/',
		name: 'Menu',
		component: Layout,
		//Menu开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'MenuList',
				component: () => import('@/views/Menu/List.vue')
	
			},
	// 		{
	// 			path: 'information',
	// 			name: 'MenuInformation',
	// 			component: () => import('@/views/Menu/Information.vue')
	
	// 		},
			// {
			// 	path: 'edit',
			// 	name: 'MenuEdit',
			// 	component: () => import('@/views/Menu/Edit.vue')
				
			// },
	// 		{
	// 			path: 'Category',
	// 			name: 'AdminCategory',
	// 			component: () => import('@/views/Admin/Category.vue')
	
	// 		},
		]
	},
	{
		path: '/Order/',
		name: 'Order',
		component: Layout,
		//Order开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'OrderList',
				component: () => import('@/views/Order/List.vue')
	
			},
	// 		{
	// 			path: 'information',
	// 			name: 'OrderInformation',
	// 			component: () => import('@/views/Order/Information.vue')
	
	// 		},
			// {
			// 	path: 'edit',
			// 	name: 'OrderEdit',
			// 	component: () => import('@/views/Order/Edit.vue')
				
			// },
	// 		{
	// 			path: 'Category',
	// 			name: 'AdminCategory',
	// 			component: () => import('@/views/Admin/Category.vue')
	
	// 		},
		]
	},
	{
		path: '/rolo/',
		name: 'Rolo',
		component: Layout,
		//rolo开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'RoloList',
				component: () => import('@/views/Rolo/List.vue')
	
			},
	// 		{
	// 			path: 'release',
	// 			name: 'RoloRelease',
	// 			component: () => import('@/views/Rolo/Release.vue')
	
	// 		},
	// 		{
	// 			path: 'edit',
	// 			name: 'RoloEdit',
	// 			component: () => import('@/views/Rolo/Edit.vue')
				
	// 		},
	// 		{
	// 			path: 'Category',
	// 			name: 'RoloCategory',
	// 			component: () => import('@/views/Rolo/Category.vue')
	
	// 		},
		]
	},
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	// console.log(to);
	// console.log(from);
	console.log(to.matched);
	//根据meta元信息校验路由是否需要登录授权

	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	if (!isRequiresAuth) {
		next();
		return;
	}

	//校验token
	let token = sessionStorage.token;
	//有token 放行
	if (token) {
		next();
		return;
	}
	if (!token) {
		//无token，强制跳转登录		
		Message.error('无效的token，请重新登录');
		setTimeout(() => {
			next(`/login?redirect=${to.path}`);
		}, 2000)
	}

});
export default router
