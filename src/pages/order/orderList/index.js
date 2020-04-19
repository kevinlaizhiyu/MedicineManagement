import React,{Component} from 'react'

import { Card,Button,Input,Tabs,Tag,Table} from 'antd';
import order from '@api/orderAPI'
import Style from './index.module.less'
import OrderDetail from '../orderDetail/index'


// 引入redux相关
import actionCreator from '../../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'

const { TabPane } = Tabs;


  const statusobj={
    '0':{txt:'未付款',color:'volcano'},
    '1':{txt:'发货中',color:'purple'},
    '2':{txt:'已完成',color:'cyan'},
    '3':{txt:'已取消',color:'red'},
    '4':{txt:'审核中',color:'blue'},
    '5':{txt:'已退款',color:'black'},
  }
class orderList extends Component {
    state = {
        showData:{},
        show:false,
        data: [],
        pagination: {defaultPageSize:5},
        loading: false,
        oStatus:'all',  //status状态值
        columns:[
            // {title: '_id',dataIndex: '_id',key:'_id'},
            {title: '订单号',dataIndex: 'oId',key:'oId'},
            {title: '用户',dataIndex: 'oUser',key:'oUser'},
            {title: '订单状态',dataIndex: 'oStatus',key:'oStatus',render(oStatus){
              return(    
                <Tag color={statusobj[oStatus].color}>{statusobj[oStatus].txt}</Tag>
              )
            }},
            {title: '创建时间',dataIndex: 'createTime',key:'createTime'},
            // {title: '更新时间',dataIndex: 'updateTime',key:'updateTime'},
            {title: '更新时间',key:'updateTime',render:(record)=>{
              return(    
              <span>{record.updateTime?record.updateTime:record.createTime}</span>
              )
            }},
            {title: '操作',key: 'action',render:(record)=>{
                return(    
                   <Button size='small' type="primary" onClick={this.jumpDetail.bind(this,record)}>查看</Button>
                )
              }},
        ]
      };
    componentDidMount() {
        this.fetch();  //挂载数据请求进行渲染
    }
    jumpDetail=  async (record)=>{
       await this.setState({showData:record})
       await this.setState({show:true}) //显示详情页
    }
    handleTableChange = (pagination) => {  //页数切换时触发
      const pager = { ...this.state.pagination };
      console.log(pager)
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        results: 5,
        page: pagination.current,
        oStatus:this.state.oStatus
      });
    };
  
    fetch = (params = {}) => {  //网络请求订单列表
      let {results=5,page=1,oStatus} = params;   //页面大小，页面，订单状态
      this.setState({ loading: true });
      let request = ''
      console.log(oStatus)
      if(oStatus ==='all'||!oStatus){  //初次加载或者选择全部
        request= order.find(
          {
            pageSize:results,
            page, 
            oId:this.refs.oId.state.value,
            oUser:this.refs.oUser.state.value,
          })
      }else{  //指定订单类型
        request= order.findStatus({
          pageSize:results,page,
          oStatus:Number(oStatus),
          oId:this.refs.oId.state.value,
          oUser:this.refs.oUser.state.value,
        })
      }
      request.then(data => {
        if(data.code===403){          
          this.setState({
            loading: false,  //关闭loading
          })
          console.log(this);
          this.props['CHANGE_LimitShow']();
          return 
        }
        const pagination = { ...this.state.pagination };
        pagination.total = data.allcount; //总记录数 
        this.setState({
          loading: false,  //关闭loading
          data: data.orderList,  //更新表格数据
          pagination,
          oStatus:oStatus
        });
        // message.success('查询成功');
      });
    }
    callback=(key)=> { //tab切换触发axios请求
        const pager = { ...this.state.pagination };
        pager.current = 1;
        console.log(key)
        this.setState({
          oStatus:key,
          pagination: pager
        })
        this.refs.oId.state.value='';
        this.refs.oUser.state.value='';
        this.fetch({
            results: 5,
            page: 1,
            oStatus:key
          });
    }
    close=()=>{  //详情页的关闭
      this.setState({show:false})
    }



    render() { 
        return ( 
            <div className={Style.box}>
                <Card className={Style.card} title="订单列表" bordered={false} >
                    {/* tab切换 */}
                    <Tabs tabPosition='top' animated={false} defaultActiveKey="all" onChange={this.callback}>
                        <TabPane tab="全部" key="all">
                        </TabPane>
                        <TabPane tab="未付款" key="0">
                        </TabPane>
                        <TabPane tab="发货中" key="1">
                        </TabPane>
                        <TabPane tab="已完成" key="2">
                        </TabPane>
                        <TabPane tab="已取消" key="3">
                        </TabPane>
                        <TabPane tab="审核中" key="4">
                        </TabPane>
                        <TabPane tab="已退款" key="5">
                        </TabPane>
                       
                    </Tabs>
                    {/* 搜索 */}
                    <div className={Style.search}>
                      <div className={Style.lab}>
                        <label>订单号: </label><Input className={Style.inp} placeholder="请输入" ref="oId" />
                        <label>用户: </label><Input className={Style.inp} placeholder="请输入"  ref="oUser"/>
                      </div>
                      <div className={Style.btn}>
                        <Button type="primary" className={Style.bt} onClick={()=>{ //点击进行多条件模糊查询
                          this.fetch({
                            results:5,
                            page: 1,
                            oStatus:this.state.oStatus,
                          })
                            
                          
                          
                        }}>查询</Button>
                        <Button className={Style.bt} onClick={()=>{
                            this.refs.oId.state.value='';
                            this.refs.oUser.state.value='';
                        }}>重置</Button>
                      </div>
                       
  
                        
                    </div>
                  
                    {/* 表格 */}
                    <Table
                        columns={this.state.columns} 
                        rowKey={record => record._id}
                        dataSource={this.state.data}   //数据源
                        pagination={this.state.pagination}  //分页器
                        loading={this.state.loading}  //页面加载
                        onChange={this.handleTableChange}  //分页、排序、筛选变化时触发
                    />
                </Card>
                 {this.state.show?<OrderDetail close={this.close} orderMsg={this.state.showData}></OrderDetail>:''}
             </div>
         );
    }
}
 


// export default orderList

export default connect(state=>state,(dispath)=>{
  return bindActionCreators(actionCreator,dispath)
})(orderList);