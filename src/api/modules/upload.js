import axios from 'axios';

let del = (data) => axios.delete('/api/upload',{params:data});

export default  {
	del,
	
	
	
}