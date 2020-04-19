import axios from '../utils/axios';

const HOST= 'http://47.97.244.129:3002'
// const HOST= 'http://localhost:3002'

class Order{
    findStatus(payload){
        let url =`${HOST}/order/searchStatus`
        return axios.post(url,payload)
    }
    find(payload){ 
        let url =`${HOST}/order/find`
        return axios.post(url,payload)
    }
    getAudioOrder(){  //获取审核订单
        let url =`${HOST}/order/audioFind`
        return axios.get(url)
    }
    
    audioOrder(payload){  //审核订单
        let url =`${HOST}/order/audioOrder`
        return axios.post(url,payload)
    }
}

export default new Order()
