import React,{Component} from 'react'

import { Card,Table} from 'antd';
import log from '@api/logApI'
import Style from './index.module.less'

class Log extends Component {
    state = {
      data:[],
      loading: false,
      pagination: {defaultPageSize:8},
      columns :[
        {
          title: '访问目标',
          dataIndex: 'target',
        },
        {
          title: '访问者',
          dataIndex: 'adminName',
        },
        {
          title: '访问时间',
          dataIndex: 'time',
        },
        {
          title: '访问结果',
          dataIndex: 'mess',
        },
      ]
    }
    componentDidMount() {
        // log.getLog({page:1,pageSize:5})
        this.fetch()
        // this.fetch();  //挂载数据请求进行渲染
    }
  
    fetch = (params = {}) => {  //网络请求订单列表
      let {results=8,page=1} = params;   //页面大小，页面
      this.setState({ loading: true });  
       
      log.getLog({pageSize:results,page}).then(data => {
          this.setState({
            loading: false,  //关闭loading
          })
        const pagination = { ...this.state.pagination };
        pagination.total = data.allcount; //总记录数 
        this.setState({
          loading: false,  //关闭loading
          data: data.logList,  //更新表格数据
          pagination,
        });
        // message.success('查询成功');
      });
    }
  
    handleTableChange = (pagination) => {  //页数切换时触发
      const pager = { ...this.state.pagination };
      console.log(pager)
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        results: 8,
        page: pagination.current,
      });
    };
 



    render() { 
        return ( 
           <div>
                <Card className={Style.card} title="系统日志" bordered={false} >          
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
                
             </div>
         );
    }
}
 


export default Log