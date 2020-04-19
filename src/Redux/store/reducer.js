import state from './state'
import { CHANGE_AGE,CHANGE_NAME } from './actionType';
export default (prevState=state,actions)=>{
    let newData = JSON.parse(JSON.stringify(prevState))

    let {type,payload}=actions
    
    switch (type) {
        case CHANGE_NAME:
            newData.name=payload
            break;
        case CHANGE_AGE:
            newData.age=payload
            break;
        default:
            break;
    }
    return newData
}