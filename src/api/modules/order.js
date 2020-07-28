import axios from 'axios';

//列表get方法
let list = (data) => axios.get('/api/admin/order/list',{ params: data });





export default {
	list,

	
}