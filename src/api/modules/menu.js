import axios from 'axios';

//根据角色id获取侧边栏树形菜单
let list = (data) => axios.get('/api/menu/tree', { params: data });

//获取子菜单
let sub = (data) => axios.get('/api/menu/sub', { params: data });

//添加子菜单
let insert = (data) => axios.post('/api/menu', data);

//删除子菜单
let remove = (data) => axios.delete('/api/menu', { params: data });

//编辑子菜单
let edit = (data) => axios.put('/api/menu', data);

//获取菜单权限
let menuInfo=(data)=>axios.get('/api/menu/sub',{params:data});

//获取所有的图标
let geticon = (data) => axios.get('/api/admin/icon/list', { params: data });

//设置子菜单图标
let subicon = (data) => axios.put('/api/menu/icon', data);

//设置子菜单图标
let icon = (data) => axios.put('/api/menu/icon', data);

let insertMenu=(data)=>axios.post('/api/menu',data);




//根据角色id获取侧边栏树形菜单
let loadMenu = (data) => axios.get('/api/menu/tree', { params: data });
export default {
	list,
	sub,
	insert,
	remove,
	edit,
	menuInfo,
	geticon,
	subicon,
	icon,
	insertMenu,
	loadMenu


}
