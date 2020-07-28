import axios from 'axios'
//获取省份
let getProvince = () => axios.get('/api/pcct/province');
//获取城市
let getCity = (id) => axios.get('/api/pcct/city', { params: id })
//获取县市区
let getCountry = (id) => axios.get('/api/pcct/county', { params: id })
//获取街道
let getTown = (id) => axios.get('/api/pcct/town', { params: id })
export default {
	getProvince,
	getCity,
	getCountry,
	getTown
}
