import axios from 'axios';

//根据角色id获取侧边栏树形菜单
let list = (data) => axios.get('/api/menu/tree',{ params: data });

//获取子菜单
let sub = (data) => axios.get('/api/menu/sub',{ params: data });

//添加子菜单
let insert = (data) => axios.post('/api/menu', data);

//删除子菜单
let remove = (id) => axios.delete(`/api/menu`,{params:id});

//编辑子菜单
let edit = (data) => axios.put('/api/menu',data);





export default {
	list,
	sub,
	insert,
	remove,
	edit,
	
	
}