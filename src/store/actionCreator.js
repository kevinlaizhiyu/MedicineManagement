import {CHANGE_NAME,CHANGE_AGE,CHANGE_LimitShow}  from './actionTypes'

// 大臣 写奏折
export default{
    // 分同步和异步的写法
    // 同步的写法
  // [CHANGE_NAME](){
  //     return { 
  //       type:CHANGE_NAME,
  //       payload:'半藏'
  //     }   
  // },
  //异步的写法
  [CHANGE_NAME](){
    //dispatch connect 传递而来
        return(dispatch)=>{
            setTimeout(()=>{
            let action ={ 
                    type:CHANGE_NAME,
                    payload:'半藏'
                  }   
            dispatch(action)
            },1000)
        }
  },


  [CHANGE_AGE](){
    return{
      type:CHANGE_AGE,
      payload:99
    }
  },
  [CHANGE_LimitShow](){
    return{
      type:CHANGE_LimitShow,
      // payload:99
    }
  },


}