import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import actionCreator from './store/actionCreator'
import {bindActionCreators} from 'redux'

class Son1 extends Component{
    
    render(){
        let {name,age}=this.props
        return (
            <Fragment>
               <h1>组件1</h1>
                <p>姓名:{name}</p>
                <p>年龄:{age}</p>

                <button onClick={
                    ()=>{
                        this.props.changenName()
                   
                    }
                }>点击改名</button>

                <button onClick={()=>{
                     this.props.changeAge()
                }}>点击长大</button>
            </Fragment>
        )
    }
}
export default connect(state=>state,dispatch=>bindActionCreators(actionCreator,dispatch))(Son1)