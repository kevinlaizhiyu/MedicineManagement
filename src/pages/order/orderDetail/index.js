import React,{Component} from 'react'
import {Card,Descriptions,Tag,Table } from 'antd'
import Style from './index.module.less'



const statusobj={
    '0':{txt:'未付款',color:'volcano'},
    '1':{txt:'发货中',color:'purple'},
    '2':{txt:'已完成',color:'cyan'},
    '3':{txt:'已取消',color:'red'},
    '4':{txt:'审核中',color:'blue'},
    '5':{txt:'已退款',color:'black'},
  }
const columns = [
    {
        title: '商品Id',
        key: 'productId',
        dataIndex: 'productId',
    },
    {
        title: '描述',
        key: 'name',
        dataIndex: 'name',
    },
    {
      title: '缩略图',
      dataIndex: 'img',
      key: 'img',
      render: text => <img alt='' className={Style['tab-pic']} src={text}></img>,
    },
    {
        title: '选择规格',
        key: 'sel',
        render:(record)=>{
           return (
            <span>{record.standardsTitle+':'+record.selstandardsItem}</span>
           )
        }
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },

    {
        title: '小计',
        key: 'scount',
        render:(record)=>{
            return (
             <span>{record.price*record.count}</span>
            )
         }
    },
  ];
class orderDetail extends Component {
    state = { 
        
    }
    componentDidMount(){
    }
    render() { 
        let {orderMsg}= this.props;
        let {oShopMsg}=orderMsg
        console.log(oShopMsg)
        return ( 
            <div className={Style.box}>
                <Card className={Style.card} title="订单详情" bordered={false}   extra={<span onClick={()=>{
                    this.props.close();
                }}>返回</span>}>
                <Descriptions title="订单信息" className={Style.Msg}>
                    <Descriptions.Item label="订单号">{orderMsg.oId}</Descriptions.Item> 
                    <Descriptions.Item label="订单状态">{ <Tag color={statusobj[orderMsg.oStatus].color}>{statusobj[orderMsg.oStatus].txt}</Tag>}</Descriptions.Item>
                </Descriptions>
                
                <Descriptions title="用户信息" className={Style.Msg}>
                    <Descriptions.Item label="姓名">{orderMsg.oAddress.getName}</Descriptions.Item> 
                    <Descriptions.Item label="手机号">{orderMsg.oAddress.getPhone}</Descriptions.Item>
                    <br />
                    <Descriptions.Item label="城市">{orderMsg.oAddress.address.split('-')[0]}</Descriptions.Item>
                    <Descriptions.Item label="详细地址">{orderMsg.oAddress.address.split('-')[1]}</Descriptions.Item> 
                </Descriptions>
                <div className={Style.Msg}>
                    <span className={Style.title}>商品信息</span>
                    <Table rowKey={(record)=>{return record.productId}} columns={columns} dataSource={oShopMsg} pagination={false} footer={() => ''} />
                </div>
                </Card>
            </div>
         );
    }
}
 
export default orderDetail;