import React, { Component,Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { Menu, Dropdown, Icon,message  } from 'antd';
import style from './index.module.less'

let userdata =[
  {name:'个人中心',icon:'user',divider:false},
  {name:'个人设置',icon:'setting',divider:true},
  {name:'退出登录',icon:'logout',divider:false},
]
let langData =[
  {name:'简体中文',icon:'user',divider:false},
  {name:'繁体中文',icon:'setting',divider:true},
  {name:'英语',icon:'logout',divider:false},
]


 


class HeaderNav extends Component {
  state = {  }

  createMenu(data){
    return (
       <Fragment>
       <Menu onClick={this.onClick}>
         {data.map((item,index)=>{
           return(   
               <Menu.Item key={item.name}>
                 <span rel="noopener noreferrer">
                 <Icon type={item.icon} />{item.name}
                 </span>
                 {/* <Menu.Divider></Menu.Divider> */}
               </Menu.Item>
           )
         })}
       </Menu>
      </Fragment>
    )
   }
  onClick = ({ key }) => {
    console.log(key)
    if(key==='退出登录'){
        message.info(`退出登录,3s后进行页面跳转`);
        setTimeout(() => {
          // 清除本地local
          let userMsg = JSON.parse(localStorage.getItem('userMsg'))
          userMsg.token='';//清除token
          localStorage.setItem('userMsg',JSON.stringify(userMsg)); //更新local
          this.props.history.replace('/login')
        }, 3000);
        
      }
    }
  render() { 
    return ( 
      <div className={style.header}>
        <article>皮噜娃商城后台管理系统</article>
        <Dropdown  overlay={this.createMenu(userdata)} className={style.dropdown}>
          <span  className="ant-dropdown-link" onClick={(e)=>{
            console.log(e)
             return e.preventDefault()
          }}>
              <img src='ava.png' alt='' style={{width:'20px'}}></img>
              <span style={{marginLeft:'5px'}}>admin</span>
           
            {/* admin <Icon type="down" /> */}
          </span>
        </Dropdown>
        <Dropdown overlay={this.createMenu(langData)} className={style.dropdown}>
          <span className="ant-dropdown-link" onClick={e =>  e.preventDefault()}>
            
          <Icon style={{fontSize :'20px'}} type="codepen-circle" />
          <span style={{marginLeft:'5px'}}>语言切换</span>
          </span>
        </Dropdown>
      </div>
     );
  }
}
 
export default withRouter(HeaderNav);