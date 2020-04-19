import Axios from '../utils/axios'
class Admin {
    list() {
        let url = 'http://47.97.244.129:3002/admin'
        return Axios.get(url)
    }
    add({userName,passWord,Status}){
        console.log(userName);
        console.log(passWord);
        console.log(Status);
        
        let url='http://47.97.244.129:3002/admin/add'
        return Axios.post(url,{userName,passWord,Status})
    }
    del(_id){
        let url='http://47.97.244.129:3002/admin/del'
        // 模板字符串写法
        // return Axios.delete(`${url}/${_id}`)
        // 拼接法
        // return Axios.post(url+'/'+_id)
        return Axios.post(url,{_id})
    }
    changeStatus(obj){
        let url='http://47.97.244.129:3002/admin/changeStatus'
        return Axios.post(url,obj)
    }
}
export default new Admin()