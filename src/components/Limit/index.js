import React,{Component} from 'react';
import Style from './index.module.less'
import {notification} from 'antd'

import actionCreator from '../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'


class Limit extends Component {  //权限
    
    state = {  }
    openNotification = () => {
        notification['warning']({
          message: '操作失败',
          duration: 2,
          description:
            '原因：当前管理员账号权限不足',
          onClick: () => {
            console.log(this)
            console.log('Notification Clicked!');
          },
          onClose:()=>{ //关闭的时候触发 
            this.props['CHANGE_LimitShow'](true)
          }
        });
     };
     componentDidMount(){
         this.openNotification()
     }
    render() { 
        return (
             <div className={Style.box}></div>
        );
    }
}
 

export default connect(state=>state,(dispath)=>{
  return bindActionCreators(actionCreator,dispath)
})(Limit);