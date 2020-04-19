import  { CHANGE_NAME, CHANGE_AGE } from './actionType'
 

export default {
    changenName(){
        let action ={
            type:CHANGE_NAME,
            payload:'李雷雷'
        }
        return action
    },
    changeAge(){
        let action ={
            type:CHANGE_AGE,
            payload:178
        }
        return action
    }
    
  
}