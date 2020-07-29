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
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false },

	},
	//注册
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false },
	},
	//商品路由
	{
		path: '/goods/',
		name: 'Goods',
		component: Layout,
		//goods开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'GoodsList',
				component: () => import('@/views/Goods/List.vue')

			},
			{
				path: 'release',
				name: 'GoodsRelease',
				component: () => import('@/views/Goods/Release.vue')

			},
			{
				path: 'edit/:id',
				name: 'GoodsEdit',
				component: () => import('@/views/Goods/Edit.vue'),
				props:true
				
			},
			{
				path: 'Category',
				name: 'GoodsCategory',
				component: () => import('@/views/Goods/Category.vue')

			},
		]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		//User开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
	
			},
			{
				path: 'info',
				name: 'UserInfo',
				component: () => import('@/views/User/Info.vue')
	
			},
			{
				path: 'edit',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
				
			},
	// 		{
	// 			path: 'Category',
	// 			name: 'UserCategory',
	// 			component: () => import('@/views/User/Category.vue')
	
	// 		},
		]
	},
	{
		path: '/auth/',
		name: 'Auth',
		component: Layout,
		//auth开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'menu',
				name: 'AuthMenu',
				component: () => import('@/views/Auth/Menu.vue')
	
			},
			{
				path: 'role',
				name: 'AuthRole',
				component: () => import('@/views/Auth/Role.vue')
			},
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
		path: '/order/',
		name: 'Order',
		component: Layout,
		//auth开头的路由，都需要登录。
		meta: { requiresOrder: true },
		children: [{
				path: 'list',
				name: 'OrderList',
				component: () => import('@/views/Order/List.vue')
	
			},
			// {
			// 	path: 'role',
			// 	name: 'OrderRole',
			// 	component: () => import('@/views/Order/Role.vue')
			// },
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
