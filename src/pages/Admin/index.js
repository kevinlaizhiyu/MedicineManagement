import React, { Component,Fragment} from 'react';
import {withRouter}  from 'react-router-dom'
import CustomNav from '../../components/CustomNav'
import HeaderNav from '../../components/HeaderNav'
import Limit from '../../components/Limit'
import { Layout, message } from 'antd';
import Style from './index.module.less'

import actionCreator from '../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'


const { Header, Content, Sider } = Layout;

class Admin extends Component {
  componentDidMount=()=>{
    console.log(this)
    try {
      let {token} =JSON.parse(localStorage.getItem('userMsg')) 
      console.log('cunzai')
      if(!token){ //token不存在,返回到login页面
          message.error('当前未登录,请登录')
          this.props.history.replace('/login')
      }
    } catch (error) {
          message.error('当前未登录,请登录')
          this.props.history.replace('/login')
    }
         
  }
  render() { 
    let {LimitShow} = this.props
    console.log(LimitShow)
    return ( 
      <Fragment>
        <Layout className={Style.wrapper}>
          {/* 侧边栏 */}
        <Sider>
          <div style={{background:'#fff',textAlign: 'center'}}>
              {/* <img style={{width:'82px'}} alt='' > */}
              <div className={Style.logo}>
                  <img src='logo.jpg' alt=''></img>
              </div>
            
          </div>
          <CustomNav></CustomNav>
        </Sider>
      
        <Layout >
        <Header className={Style.header}>
            <HeaderNav></HeaderNav>
        </Header>
        <Content className={Style.content}> 
          {this.props.children}
        </Content>
        {/* <Footer style={ {height:'10%'} }>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
        {/* 根据全局状态值判断权限是否满足 */}
        {LimitShow?'':<Limit></Limit>}   
    </Fragment>
     );
  }
}
 
export default connect(state=>state,(dispath)=>{
  return bindActionCreators(actionCreator,dispath)
})(withRouter(Admin));

 
