import axios from 'axios';

//管理员列表get方法
let list = (data) => axios.get('/api/role/list',data);

//添加角色
let insert = (data) => axios.post('/api/role', data);

//删除角色
let remove = (id) => axios.delete(`/api/role/`,{params:id});

//编辑角色
let edit = (data) => axios.put('/api/role/',data);



export default {
	list,
	insert,
	remove,
	edit,
	
	
}