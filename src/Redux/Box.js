import React, { Component, Fragment } from 'react'
import Son1 from './Son1'
import Son2 from './Son2'

class Box extends Component{
    render(){
        return (
            <Fragment>
                <Son1></Son1>
                <hr/>
                <Son2></Son2>
            </Fragment>
        )
    }
}
export default Box