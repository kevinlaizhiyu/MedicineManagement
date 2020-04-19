import Store from './store'
import State from './state'
import { CHANGE_NAME,CHANGE_AGE} from './actionType'


export default {
    changeName(){
        let action={
            type:CHANGE_NAME,
            name:()=>{
                if(State.name==='韩默默'){
                    return '李雷雷'
                }else if(State.name==="李雷雷"){
                    return '韩默默'
                }
            }
        }
        Store.dispatch(action)
    },
    changeAge(){
        let action={
            type:CHANGE_AGE,
            age:()=>{
                return  State.age+1
            }
        }
        Store.dispatch(action)
    },
    substractAge(){
        let action={
            type:'SUB_AGE',
            age:()=>{
                return State.age-1
            }
        }
        Store.dispatch(action)
    }
}