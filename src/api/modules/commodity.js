import axios from 'axios';

//获取商品列表
let list = (data) => axios.get('/api/admin/goods/list', { params: data });

//获取商品详情
let goods = (data) => axios.get('/api/admin/goods', { params: data });

//删除商品
let remove = (id) => axios.delete(`/api/admin/goods/`,{params:id});

//发布商品
let release = (data) => axios.post('/api/admin/goods', data);

//编辑商品
let editGoods = (data) => axios.put('/api/admin/goods',data);

//获取子级分类
let all = (pId) => axios.get('/api/category/sub', { params: pId });

//删除分类
let del = (id) => axios.delete(`/api/category`,{params:id});

//添加子菜单
let insert = (data) => axios.post('/api/category', data);

//更新分类
let edit = (data) => axios.put('/api/category',data);

//添加子结点
let add = (data) => axios.post('/api/category', data);


export default {
	list,
	remove,
	goods,
	all,
	del,
	insert,
	edit,
	release,
	add,
	editGoods
	


}
