import React,{Component} from 'react'
import order from '@api/orderAPI';
import OrderDetail from '@pages/order/orderDetail'
import NowTime from '@utils/NowTime'
import { Card, List, Modal, Skeleton,Button,Input,message } from 'antd';

// 引入redux相关
import actionCreator from '../../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import Style from './index.module.less'
const { TextArea } = Input;

class orderAudit extends Component {
    state = {
       showData:{},
       show:false,
       audioOrder:[],//审核订单
       initLoading: true,
       loading: false,
       data: [],
       list: [],
       visible: false 
    };
    componentDidMount() {    //数据请求    
        this.getData(res => {
          this.setState({
            initLoading: false,  //加载状态显示
            data: res.result,   //list数据
            list: res.result,
            showData:res.result[0]
          });
        //   console.log(res)
        });
    }
    close=()=>{  //详情页的关闭
        this.setState({show:false})
    }
    jumpDetail = (record) =>{
        this.setState({
            showData:record,
            show:true
          }); //显示详情页
    }

    getData = callback => { //函数做参数
        order.getAudioOrder().then((res)=>{  //页面加载请求所有审核数据
            callback(res);
        })
    };

    showModal = async(record) => {
        await this.setState({
            visible: true,
            showData:record,
        });
        console.log(this.state.showData)
    };
    
    handleOk = e => {  //确认
        console.log('确认');
        this.setState({
          visible: false,
        });
    };


    handleCancel = e => {  //取消
        this.setState({
          visible: false,
        });
      };

    audio = async(item)=>{  //点击审核 更新审核信息
        await this.setState({
            showData:item,
        });
    }

    submitaudio=(obj)=>{
        order.audioOrder(obj).then((res)=>{  //审核完成 再次渲染页面
            if(res.code===403){ //权限不足
                this.props['CHANGE_LimitShow']();
                return 
            }
            this.getData(data => {
                this.setState({
                  initLoading: false,  //加载状态显示
                  data: data.result,   //list数据
                  list: data.result,
                  showData:data.result[0]
                });
              });
        })
        message.success('订单审核成功');
        this.refs.audiores.state.value='请输入审核结果'
        
    }

    refuse=()=>{ //拒绝通过
        this.setState({initLoading: true})
        let obj={
            oId:this.state.showData.oId, //订单Id
            oStatus:'1', //审核后的订单状态
            auditRes:this.refs.audiores.state.value, //审核结果
            audioAdmin:'admin',//审核管理员
            updateTime: NowTime(), //更新时间
        }
        this.submitaudio(obj);
       

    } 
    pass=()=>{ //通过
        this.setState({initLoading: true})
        let obj={
            oId:this.state.showData.oId, //订单Id
            oStatus:'5', //审核后的订单状态
            auditRes:this.refs.audiores.state.value, //审核结果
            audioAdmin:'admin',//审核管理员
            updateTime: NowTime(), //更新时间
        }
        this.submitaudio(obj);
    }
    render() { 
        const { initLoading,  list } = this.state;
        
        return ( 
            
            <div className={Style.box}>
                
                <Card className={Style.card} title="审核订单" bordered={false} >
                    {/* 显示待审核的订单信息 */}

                <section className={Style.ListBox}>
                
                    <div className={Style.list}>
                        <List loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={list}    //数据源
                            renderItem={item => (
                                <List.Item 
                                    actions={[<span key="list-loadmore-edit" onClick={this.audio.bind(this,item)}>审核</span>, <span key="list-loadmore-more" onClick={()=>{
                                        this.jumpDetail(item)
                                    }}>详情</span>]}
                                >
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={<span>申请用户：{item.oUser}</span>}
                                        description={item.createTime}
                                    />
                                    
                                    </Skeleton>
                                </List.Item>
                            )} 
                        />
                  
                   
                    </div>
                    <div className={Style.audio}>
                       <label><span>申请人：</span>{this.state.showData.oUser||''}</label> 
                       <label><span>订单号：</span>{this.state.showData.oId||''}</label>
                       
                       <label><span>申请理由：</span>{this.state.showData.auditMsg?this.state.showData.auditMsg:'无'}</label>
                       <label><span>图片：</span>{this.state.showData.auditImg?<img alt='' style={{width:'100px'}} src={this.state.showData.auditImg}/>:'无'}</label>
                       <label><span>申请时间：</span>{this.state.showData.createTime||''}</label>
                       <TextArea ref='audiores' rows={4} defaultValue='请输入审核结果' autoSize={{minRows:4, maxRows:4}}/>
                       <section className={Style.btn}>
                        <Button className={Style.bt} type='primary' onClick={this.pass}>通过</Button>
                        <Button className={Style.bt} type='danger' onClick={this.refuse}>拒绝</Button>          
                       </section>
                       
                       
                   </div>
                </section>
                </Card>
                {this.state.show?<OrderDetail  close={this.close} orderMsg={this.state.showData}></OrderDetail>:''}              
                <Modal
                    title="提交"
                    closable
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    是否确认你的审核结果
                </Modal>
            </div>
         );
    }
}
 

export default connect(state=>state,(dispath)=>{
    return bindActionCreators(actionCreator,dispath)
  })(orderAudit);