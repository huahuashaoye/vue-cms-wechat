import axios from 'axios';
import { Message } from 'element-ui';
//loading 服务方式
import { Loading } from "element-ui"
//引入router实例
import router from '@/router/index'
//loading实例
let loading;

//设置默认的地址
axios.defaults.baseURL = 'http://localhost:3003'

//请求header头
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	//开启Loading
	loading = Loading.service({ background: "rgba(0,0,0,0.3)" });
	console.log(config);
	if (config.url == '/admin/login' || config.url == '/admin/register') { return config; };
	let token = sessionStorage.token;
	//无token
	if (!token) {
		Message.error('无效的token,请重新登录！');
		setTimeout(() => {
			loading.close();
			router.replace('/login');
		}, 2000);
	}
	
	
	//有token值
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function({ data, status }) {
	//在这里你可以判断后台返回数据携带的请求码 状态码
	// console.log(response);
	//response为返回的响应数据   
	//return 的是需要的数据
	loading.close();
	return data;
	// 非200请求抱错
	console.log(response);

}, function(error) {
	// 对响应错误做点什么
	
	return Promise.reject(error);
});