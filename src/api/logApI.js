import axios from '../utils/axios';

const HOST= 'http://47.97.244.129:3002'
// const HOST= 'http://localhost:3002'

class Order{
    getLog(payload){ 
        let url =`${HOST}/log`
        return axios.post(url,payload)
    }
}

export default new Order()
