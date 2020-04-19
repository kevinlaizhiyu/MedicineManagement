import React,{Component,Fragment} from 'react'
import Style from './index.module.less'
import {Card,Layout} from 'antd'

import ReactEcharts from 'echarts-for-react';
const { Footer } = Layout;


class Home extends Component {
    state = {  }
    line(){
        return{
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
            {
                data: [82, 100, 150, 34, 190, 10, 120],
                type: 'line',
                areaStyle: {}
            }
        ]
        }
      }
    render() { 
        return ( 
            <Fragment>
                <div className={Style.sayhello}>
                    <img src='ava.png' alt=''></img>
                    <span>欢迎登录,祝您开心每一天!</span>
                </div>
               
                <div className={Style.sale}>
                    
                    <Card title="销售量" className={Style.card}>
                            <div>
                                <ReactEcharts option={this.line()}></ReactEcharts>
                            </div>
                    </Card>
                  
                </div>

                 <div className={Style.cards}>
                    
                    <Card title="商品数量" className={Style.card}>
                       105件
                    </Card>
                    <Card title="订单数量" className={Style.card}>
                        32笔
                    </Card>
                    <Card title="用户数" className={Style.card}>
                        4人
                    </Card>
                    <Card title="管理员数" className={Style.card}>
                    7人
                    </Card>
                </div>
                {/* <div className={Style.detail}>
                    <Card title="后台管理信息" className={Style.card}>
                        <List size='small'
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                            </List.Item>
                        )}
                    /> 
                    </Card>   
                </div> */}
                 <Footer className={Style.footer}>Ant Design ©2018 Created by Ant UED</Footer>
            </Fragment>
         );
    }
}
 
export default Home;