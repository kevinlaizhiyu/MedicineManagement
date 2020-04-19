import React, { Component } from 'react';
import { Card, Table, Button,Tag } from 'antd';
import UserApi from '../../api/UserApi'
import Style from './index.module.less'

const statusobj={
  '0':{txt:'锁定',color:'cyan'},
  '1':{txt:'正常',color:'blue'},
}
const sex={
  '0':{txt:'女',color:'red'},
  '1':{txt:'男',color:'gray'},
}
class User extends Component {
  state = {
    dataSource: [],
    columns: [
      {
        title: '昵称',
        dataIndex: 'nickName',
        id: '3'
      },
      // {
      //   title: '_id',
      //   dataIndex: '_id',
      //   id: '1'

      // },
      {
        title: '手机号',
        dataIndex: 'phone',
        id: '2'
      },

      // {
      //     title: '密码',
      //     dataIndex: 'password',
      //     id: '4',
      // },
      {
        title: '性别',
        dataIndex: 'sex',
        id: '5',
        render(oStatus){
          return(    
            <Tag color={sex[oStatus].color}>{sex[oStatus].txt}</Tag>
          )
        }},
      {
        title: '图片',
        dataIndex: 'avatarImg',
        id: '7',
        render: text => <img alt='' className={Style['tab-pic']} src={text}></img>,
      },
      // {
      //   title: 'token值',
      //   dataIndex: 'token',
      //   id: '8',
      // },
      {
        title: '状态',
        dataIndex: 'status',
        id: '9',
        render(oStatus){
          return(    
            <Tag color={statusobj[oStatus].color}>{statusobj[oStatus].txt}</Tag>
          )
        }},
      {
          title: '地址',
          dataIndex: 'address',
          id: '10',
          // render: text => <img alt='' className={Style['tab-pic']} src={text}></img>,
          render(){
            
            return(<Button type="dashed" shape="round" icon="bank" >详细地址</Button>)
            
            
          }
      },
    ]
  }

  // 成功的回调
  handok() {
    let result = UserApi.list()
    console.log(result);
    console.log(1);


  }
  // 发起网络请求在生命周期
  // 在生命周期里面查看console。log的结果  要加上异步   await   async
  async componentDidMount() {
    let result = await UserApi.list()
    console.log(result);
    console.log(result.userList);
    // 在这边把 result下的userList 赋值给data
    this.setState({ dataSource: result.userList })

  }
  // 失败的回调
  render() {
    let { dataSource, columns } = this.state
    return (
      <Card title='用户管理'>
        <Table dataSource={dataSource} columns={columns} rowKey={row => row._id}></Table>
      </Card>
    );
  }
}

export default User;