import axios from 'axios';

//管理员列表get方法
let list = (data) => axios.get('/api/role/list', data);

//添加角色
let insert = (data) => axios.post('/api/role', data);

//删除角色
let remove = (id) => axios.delete(`/api/role/`, { params: id });

//编辑角色
let edit = (data) => axios.put('/api/role/', data);

//根据角色配置获取菜单信息
let config = (id) => axios.get('/api/role/config', { params: id });


//为指定角色添加菜单
let addmenu=(data)=>axios.post('/api/role/menu',data);

//为指定角色删除菜单
let removemenu=(data)=>axios.delete('/api/role/menu',data);

export default {
	list,
	insert,
	remove,
	edit,
	config,
	addmenu,
	removemenu


}
