import axios from '../utils/axios';

const HOST= 'http://47.97.244.129:3002'
// const HOST= 'http://localhost:3002'

class Goods{
    list(page=1,pageSize=2){
        let url =`${HOST}/shop/find`
        return axios.get(url,{params:{page,pageSize}})
     
    }
   del(_id){
       let url=`${HOST}/shop/del`
       return axios.post(url,{_id})
   }
   putaway(_id,Status){
       let  url=`${HOST}/shop/changeState`
       return axios.post(url,{_id,Status})
       
   }
   addGoods(arguements){
    let  url=`${HOST}/shop/add`
    return axios.post(url,arguements)
   }

   updateGoods(data){
       let url=`${HOST}/shop/edit`
       return axios.post(url,data)
   }

   goodsClass(){
    let  url=`${HOST}/type/find`
    return axios.get(url)
   }
   //根据一个ID查找相应商品的信息
   findOne(id){
    let  url=`${HOST}/shop/getById`
    return axios.post(url,{_id:id})
   }
   //图片上传
   picUpdate(payload){
    let url=`${HOST}/upload`
    return axios.post(url,payload)
   }

}

export default new Goods()
  