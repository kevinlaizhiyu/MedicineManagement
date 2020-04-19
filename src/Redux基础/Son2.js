import React, { Component } from 'react'
import Connect from './store/connect'
import actionCreator from './store/actionCreator'

class Son2 extends Component{
   
    render(){
        let {name,age}=this.props
        return(
            <div>
                <h1>这里是子组件2</h1>
                    <p>姓名：{name}</p>
                    <p>年龄：{age}</p>
                    <button onClick={()=>{
                        actionCreator.changeName()
                    }}>点击更改名字</button>
                    <button onClick={()=>{
                        actionCreator.changeAge()
                    }}>点击增加年龄</button>
                    <button onClick={()=>{
                        actionCreator.substractAge()
                    }}>点击减少年龄</button>
            </div>
        )
    }
}
export default Connect(Son2)