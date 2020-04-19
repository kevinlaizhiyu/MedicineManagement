import React, { Component } from 'react'
import {connect} from 'react-redux'
class Son1 extends Component{
   
    render(){
       let {name,age}=this.props
        return(
            <div>
                <h1>这里是子组件1</h1>
                    <p>姓名: {name}</p>
                    <p>年龄: {age}</p>
            </div>
        )
    }
}
export default connect(Son1)