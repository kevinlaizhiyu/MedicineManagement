import React,{Component} from 'react'
import Style from './index.module.less'
import {Button,message} from 'antd'




class Error extends Component {
  
    state = {  }
    componentDidMount(){
        this.error()
    }
    error = () => {
        message.error('页面不存在-404错误');
    };
    render() { 
        
        return ( 
            <div className={Style.error}>
                <img src="404.png" alt=''></img>
                <Button onClick={()=>{
                    this.props.history.replace('/admin/home')
                }}>back Home</Button>
            </div>
         );
    }
}
 
export default Error;