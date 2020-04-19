import React, { Component, Fragment } from "react";
import Store from './store'
export default (TempCompnent)=>{
    class Connect extends Component{
        componentDidMount(){
            Store.subscribe(()=>{
                this.setState({})
            })
        }
        render(){
            let {name,age}=Store.getState()
            return(
                <Fragment>
                    <TempCompnent age={age} name={name}></TempCompnent>
                </Fragment>
            )
        }
    }
    return Connect
}