import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
 
 
 
 

class Son2 extends Component{
   
    render(){
         let {name,age}=this.props
        return (
            <Fragment>
               <h1>组件2</h1>
               <p>姓名:{name}</p>
               <p>年龄:{age}</p>
            </Fragment>
        )
    }
}
export default connect(state=>state)(Son2) 