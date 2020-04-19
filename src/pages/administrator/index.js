import React, { Component } from 'react'
import style from './index.module.less'
import { Card, Table, Button, Modal, notification, Spin, Popconfirm, message, Tag,Icon } from 'antd';
import AdminApi from '../../api/AdminApi'


import actionCreator from '@store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'


let statusobj = {
    '0': { txt: '禁用', color: 'cyan',type:'lock' },
    '1': { txt: '正常', color: 'blue',type:'unlock' },
}
let ButterMan = {
    '0': { txt: '普通管理员', color: 'skyblue' },
    '1': { txt: '超级管理员', color: 'orange' }
}
class Admins extends Component {
    state = {
        dataSource: [],
        visible: false,
        spinning: false,
        columns: [
            // {
            //     title: '_id',
            //     dataIndex: '_id',
            //     // key: '_id',
            //     id: '1'

            // },
            // 每個low加一個id 並且在table 裡面加rowaKey={row=>row._id}  接觸報錯
            {
                title: '管理员',
                dataIndex: 'userName',
                // key: '用户名',
                id: '2'
            },
            // {
            //     title: '密码',
            //     dataIndex: 'passWord',
            //     // key: '密码',
            //     id: '3'
            // },
            {
                title: '账号状态',
                dataIndex: 'Status',
                // key: '状态',
                id: '4',
                render(oStatus) {
                    return (
                        <Tag color={statusobj[oStatus].color}><Icon type={statusobj[oStatus].type}  />{statusobj[oStatus].txt}</Tag>
                    )
                }
            },
            {
                title: '身份',
                dataIndex: 'identity',
                // key: '状态',
                id: '5',
                render(oStatus) {
                    return (
                        <Tag color={ButterMan[oStatus].color}>{ButterMan[oStatus].txt}</Tag>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                id: '6',
                render: (record) => {
                    // 自定义渲染的列表
                    // console.log(record)
                    return (
                        <div style={{cursor:'pointer'}}>
                           {record.Status?
                            <Popconfirm 
                            title="确认禁用该管理员账号?"
                            onConfirm={() => {
                                this.StatusSwitch(record._id,record.Status)
                            }}
                            onCancel={() => {
                                message.error('取消');
                            }}>
                               <Icon type="stop"  style={{fontSize:'16px'}}/>禁用
                           </Popconfirm>:
                           <Popconfirm 
                           title="确认启用该管理员账号?"
                           onConfirm={() => {
                               this.StatusSwitch(record._id,record.Status)
                           }}
                           onCancel={() => {
                               message.error('取消');
                           }}>
                              <Icon type="check"  style={{fontSize:'16px'}}/>启用
                          </Popconfirm>                        
                        }
                            
                            <Popconfirm 
                                title="你确定要删除这个用户吗?"
                                onConfirm={() => {
                                    this.delAdmin(record._id,record.identity)
                                }}
                                onCancel={() => {
                                    message.error('取消删除');
                                }}
                            >
                                {/* <Button type='danger' size='small'>删除</Button> */}
                                <Icon style={{fontSize:'16px',marginLeft:'10px'}} type="delete" />删除
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ]

    }
    
    // 根据后端返回的不同数字  渲染不同的内容
    // change = async () => {
    //     let result = await AdminApi.list()
    //     let arr = []
    //     for (let i = 0; i <= result.adminList.length; i++) {
    //         arr.push(result.adminList[i])
    //     }
    //     return arr

    // }

    // 启用禁用切换
    StatusSwitch = async(_id,Status) =>{
        Status = Status%2?'0':'1'
        let obj = {
            _id,Status
        }
        let result = await AdminApi.changeStatus(obj)
        if(result.code===403){ //权限不足
            this.props['CHANGE_LimitShow']();
            return 
          }
        if(!result.code){ //成功
            // 修改完后更新页面
            message.success('账号状态修改成功')
            this.refreshList()
        }
    }

    //  删除管理员数据
    delAdmin = async (_id,identity) => {
        // 获取到id 之后 调用接口删除id
        // console.log('删除',_id);
        if(!identity){
            let result = await AdminApi.del(_id)
            // 根据结果进行
            if(result.code===403){ //权限不足
                this.props['CHANGE_LimitShow']();
                return 
              }
            if (result.code !== 0) { return false }
            // 删除完后更新页面
            message.success('管理员删除成功')
            this.refreshList()
        }else{
            message.error('错误:超级管理无法删除')
        }
       

    }
    //  代表成功的回调
    handleOk = async () => {
        // 点击ok 确定的时候
        //  先获取输入内容
        let userName = this.refs.us.value
        let passWord = this.refs.ps.value
        let Status = this.refs.ss.value
        console.log('点击handleOk ok');
        
        let result = await AdminApi.add({ userName, passWord, Status })
        if(result.code===403){ //权限不足
            this.props['CHANGE_LimitShow']();
            return 
          }
        if (result.code !== 0) {
            return notification.error({
                description: '添加失敗，請詳細的检查参数', message: '错误', duration: 1.5

            })  
        }
        notification.success({ description: '管理员添ok，模态框即将关闭', message: '成功', duration: 1.5 })
        this.setState({ visible: false })
        console.log(result);
        // 请求成功之后再调用一次网络请求  来进行刷新页面
        this.refreshList()


        // 添加接头
        // 关闭模态框
        // 刷新页面

    }
    // 数据添加后刷新我们的列表数据
    refreshList = async () => {
        // 重新再进行一步网络请求数据
        let result = await AdminApi.list()
        // console.log(result);
        if(result.code===403){ //权限不足
            this.props['CHANGE_LimitShow']();
            return 
        }
        this.setState({ dataSource: result.adminList, spinning: false })
    }
    //  代表失败的回调
    handleCancel = () => {
        this.setState({ visible: false })
        console.log('点击handleCancel取消');
        

    }
    componentDidMount() {
        this.refreshList()
    }
    // 模态框里面的input改变
    onChange = value => {
        console.log(value);
        this.setState({ value });

    };
    render() {
        const { size } = this.state;
        let { dataSource, visible, spinning, columns } = this.state
        return (
            <div className={style.admins}>
                <Card title='管理员列表'>
                    {/* dataSource 表格内容数据
                        columns  表头数据
                        rowkey  设置为唯一索引字段 */}
                    <Button type="primary" shape="round" icon="plus" size={size} onClick={() => {
                        this.setState({ visible: true })
                    }}>添加</Button>
                    <Spin spinning={spinning}>
                        <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} rowKey={row => row._id}></Table>
                    </Spin>
                </Card>
                {/* 添加的模态框 */}
                <Modal
                    title="管理员添加"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    用戶名 :　<input type='text' ref="us"  className={style.inp1} placeholder='请输入用户名'/ ><br />
                   密　碼 :　<input type='text' ref="ps" className={style.inp1} placeholder='请输入密码'/><br />
                   {/* 状　态 :　<TreeSelect ref="Status" showSearch style={{ width: '150px' }} value={this.state.value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="请选择状态值" allowClear treeDefaultExpandAll onChange={this.onChange}>
                        <TreeNode value="1" title="已审核"></TreeNode>
                        <TreeNode value="0" title="待审核"></TreeNode>
                    </TreeSelect> */}
                    状　态 :　<input type='text' ref="ss" className={style.inp1} placeholder='请输入状态码0或1'/><br />
                </Modal>
            </div>
        );
    }
}

export default connect(state=>state,(dispath)=>{
  return bindActionCreators(actionCreator,dispath)
})(Admins);













