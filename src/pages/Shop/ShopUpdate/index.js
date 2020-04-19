import React,{Component}from 'react'
import {Card,Input, Button,TreeSelect } from 'antd'
import style from './index.module.less'
import goodsApi from '../../../api/goods'


import actionCreator from '../../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'

const { TextArea } = Input;
const { TreeNode } = TreeSelect;

 

class ShopUpdate extends Component {
    state= {
            data:{ }
    }

    async componentDidMount(){
        //获取ID
        let {id}=this.props.match.params
        //获取要修改的信息
        id = id.slice(3)
        let result = await goodsApi.findOne(id)
        console.log(result)
        if (result.code===403){
            this.props['CHANGE_LimitShow']();
            return
        }
        // result.then(data=>{
        //     if(data.code==403){
                 
        //         this.props['CHANGE_LimitShow']();
        //         return 
                
        //       }
        // })
        this.setState({data:result.result})
       
    }
     
     async update(data){
        await goodsApi.updateGoods(data).then(
            this.props.history.replace('/admin/shop/shopList')
        )
        console.log('传输成功')
      }
      

        
    render() { 
        let {data} = this.state
        return ( 
            <div className={style.box}>

            <Card title='商品添加' className={style.Card}>
                标题<Input placeholder="请输入标题" value={this.state.data.title} allowClear onChange={(e)=>{
                    data.title=e.target.value
                    this.setState({data})
                }} /><br />
                图片地址<Input placeholder="请输入图片的URL地址" value={this.state.data.imgUrl} allowClear onChange={(e)=>{
                    this.setState({imgUrl:e.target.value})
                }} />
               
                <br/>
                商品名称<Input placeholder="请输入商品名称" value={this.state.data.productName} allowClear onChange={(e)=>{
                    data.productName=e.target.value
                    this.setState({data})
                     
                }} /><br /> 
                商品ID<Input placeholder="请输入商品名称" value={this.state.data.productId} allowClear onChange={(e)=>{
                      data.productId=e.target.value
                      this.setState({data})
                    
                }} /><br />
                 商品种类<Input placeholder="请输入商品类别" value={this.state.data.type} allowClear onChange={(e)=>{
                        data.type=e.target.value
                        this.setState({data})
                    
                }} /><br />
                 商品数量<Input placeholder="请输入商品数量" value={this.state.data.count} allowClear onChange={(e)=>{
                     data.count=e.target.value
                     this.setState({data})
                    
                }} /><br />
                商品状态值
                <TreeSelect showSearch style={{ width: '100%' }}  value={this.state.data.Status} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="Please select" allowClear treeDefaultExpandAll onChange={(value)=>{
                    data.Status=value
                    this.setState({data})
                }}>
                    <TreeNode value="1" title="上架"></TreeNode>
                    <TreeNode value="-1" title="待上架"></TreeNode>
                    <TreeNode value="0" title="下架"></TreeNode>
                </TreeSelect>
                原价<Input prefix="￥" suffix="RMB"value={this.state.data.originalPrice}    onChange={(e)=>{
                     data.originalPrice=e.target.value
                     this.setState({data})
                     
                }}
                /><br />
                现价<Input prefix="￥" suffix="RMB" value={this.state.data.currentPrice}  onChange={(e)=>{
                     data.currentPrice=e.target.value
                     this.setState({data})
                     
                }}
                /><br />
                
                商品描述<TextArea placeholder="请写入商品的描述" value={this.state.data.describe} allowClear onChange={(e)=>{
                    data.describe=e.target.value
                    this.setState({data})
                      
                }}  />
               
               
                <Button className={style.submit} onClick={()=>{
                    this.update(this.state.data)
                }}>更新商品</Button>
            </Card>   
            
            </div>
         );
    }
}
 
export default connect(state=>state,(dispath)=>{
    return bindActionCreators(actionCreator,dispath)
  })(ShopUpdate);

 /* 
商品修改
1.根据商品的ID获取商品相关的信息
2.显示默认信息
3.用户进行修改
4.调用修改的接口
5.修改完成之后跳回首页
 
*/