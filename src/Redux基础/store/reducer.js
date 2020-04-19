import state from './state'
export default (preState=state,actions)=>{
    let newData = preState
    let {type,age,name}=actions
    switch (type) {
        case 'CHANGE_NAME':
            newData.name=name()
            break;
        case 'CHANGE_AGE':
           newData.age=age()
           break;
        case 'SUB_AGE':
            newData.age=age()
            break;
        default:
            break;
    }
    return newData
}