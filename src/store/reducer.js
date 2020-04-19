// 老佛爷
import {CHANGE_AGE,CHANGE_NAME,CHANGE_LimitShow} from './actionTypes'
import state from './state'
export  default (prevState = state,action)=>{
    // 深拷贝
    let newData = JSON.parse(JSON.stringify(prevState))
    let {type,payload} = action
    switch (type) {
        case CHANGE_AGE:
            newData.name=payload;  //批奏折
            break;
        case CHANGE_NAME:
            newData.age=payload;  //批奏折
            break;
        case CHANGE_LimitShow:
            if(payload){
                newData.LimitShow=payload;  //自动关闭
            }else{
                newData.LimitShow=!newData.LimitShow;  //批奏折
            }
            break;
        default:
            break;
    }
    return newData; //批完返回
}