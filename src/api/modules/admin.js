import axios from 'axios';

//管理员登录
let login = (data) => axios.post('/api/admin/login', data);

//管理员注册
let register = (data) => axios.post('/api/admin/register', data);

//编辑管理员个人资料
let edit = (data) => axios.put('/api/admin', data);

//获取管理员个人资料
let api = (id) => axios.get('/api/admin', { params: id });

//获取管理员列表
let list = (data) => axios.get('/api/admin/list', { params: data });

//删除管理员
let remove = (id) => axios.delete('/api/admin', { params: id });

//获取管理员详情
let info=(id)=>axios.get('/api/admin',{ params: id});






export default {
	login,
	register,
	edit,
	list,
	api,
	remove,
	info,
	


}
