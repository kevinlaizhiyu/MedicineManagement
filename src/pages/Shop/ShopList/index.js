import React,{Component, Fragment} from 'react'
import style from './index.module.less'
import {Card, message,Table,Tag, Button,Pagination,Popconfirm,Spin } from 'antd'
import goodsApi from '../../../api/goods'

import actionCreator from '../../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'


class ShopList extends Component {
     
        state = { 
            page:1, 
            pageSize:4,
            result:[],
            allcount:0,
            loading: true,
            columns:[{title: 'ID',dataIndex: '_id',key: '_id',width:120,}, 
            {title: '名称',dataIndex: 'title',key: 'title',width:120,}, 
            {title: '原价',dataIndex: 'originalPrice',key: 'originalPrice',width:120,render(originalPrice){
                return(
                    <Fragment>
                         <span style={{color:'blue'}}>{originalPrice}</span><span> 元</span>
                    </Fragment>
                )
            }}, 
            {title: '现价',dataIndex: 'currentPrice',key: 'currentPrice',width:120,render(originalPrice){
                return(
                    <Fragment>
                         <span style={{color:'red'}}>{originalPrice}</span><span> 元</span>
                    </Fragment>
              
                )
            }}, 
            {title: '产品图',dataIndex: 'imgUrl',key: 'imgUrl',width:160,render(imgUrl){
                return (
                    <img style={{width:100,height:100}} src={imgUrl} alt=''/>
                )
            }}, 
            {title: '描述',dataIndex: 'describe',key: 'describe', width:460}, 
            {title: '状态',dataIndex: 'Status',key: 'Status',width:120,render:(putaway)=>{
                 let obj={'0':{color:'red',msg:'已下架'},'1':{color:'green',msg:'已上架'},'-1':{color:'orange',msg:'待上架     '}}
                return( 
                <Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>
                )
            }}, 
            {title: '操作' ,fixed:'right',key: 'action',width:120,render:(recode)=>{
                return(
                    <div>
                        <Popconfirm title='你确定要删除这条数据么？' onConfirm={()=>{
                         this.delGoods(recode._id)
                        }}>
                            <Button type='danger' size='small' >删除</Button>
                        </Popconfirm>
                    
                    <Popconfirm title='你确定要上架或者下架吗？' 
                    onConfirm={()=>{this.putawayGoods(recode._id,recode.Status)
                    
                    }}
                    >
                         <Button type='warn' size='small'>上架</Button>
                    </Popconfirm>
                     
                     
                        <Button type='primary' size='small' onClick={()=>{
                            this.props.history.replace('/admin/shop/ShopUpdate/:id'+recode._id)
                        }} >修改</Button>
                     
                       
                    </div>
                )
            }}, 
        
        
        ]  
          
         }
    
   
     componentDidMount(){
         this.getListData()
     }
     //删除商品数据
     delGoods=  (_id)=>{
         let result =  goodsApi.del(_id)
         result.then(data=>{
            if(data.code===403){
                this.props['CHANGE_LimitShow']();
                return  
              }
        })
         this.getListData() 
     }
     //上架商品
     putawayGoods= async (_id,putaway)=>{
        await goodsApi.putaway(_id,putaway)
        if(putaway===1){
            putaway=0
        }else{
            putaway=1
        }
        let {code,msg} = await goodsApi.putaway(_id,putaway)
        if(code){
            return message.error(msg)
        }
        this.getListData() 
     }
     //获取商品数据
    getListData= async ()=>{
        let {page,pageSize} = this.state
        goodsApi.list(page,pageSize).then((pramas)=>{
           this.setState({result:pramas.shopList})
           this.setState({allcount:pramas.allcount}) 
           this.setState({loading:false}) 
        })   
    }
    
    render() { 
        let {result, columns,allcount,pageSize} = this.state
        
        return ( 
            <div className={style.box}>    
            
                <Card title='商品列表' className={style.Card}>
                    <Button type='primary' onClick={()=>{
                        this.props.history.push('/admin/shop/shopAdd')
                    }}>商品添加</Button>
                {/* {this.state.result.map((item,index)=>{
                    return (
                    <p key={index}>{item._id}</p>
                    )
                })} */}
                    <Spin className={style.Spin} delay={500} tip='loading...' spinning={this.state.loading}>
                            <Table scroll={{y:600,x:500}} 
                            columns={columns} 
                            pagination={false}
                            dataSource={result}
                            rowKey='_id'>

                            </Table>
                            <Pagination showQuickJumper defaultCurrent={1} total={allcount } pageSize={pageSize}  
                            onChange={(page)=>{
 
                                this.setState({page},()=>{
                                    this.getListData()
                                })  
                            }}
                            />
                     </Spin>      
                </Card>  
            </div>
         );
    }
}
 
 
export default connect(state=>state,(dispath)=>{
    return bindActionCreators(actionCreator,dispath)
  })(ShopList);

 