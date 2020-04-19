import React, { Component } from 'react'
import { Card, Input, Button, TreeSelect, message } from 'antd'
import style from './index.module.less'
import goodsApi from '../../../api/goods'

import actionCreator from '../../../store/actionCreator'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import axios from '../../../utils/axios'

import config from '../../../config/index'


const { TextArea } = Input;
const { TreeNode } = TreeSelect;



class ShopAdd extends Component {
    state = {
        "imgUrl": "",
        "title": "荷兰牛栏1111",
        "productName": "Nutrion荷兰牛栏 婴幼儿H.A半水解蛋白奶粉1段(0-6个月)750克/罐",
        "originalPrice": 269,
        "currentPrice": 119,
        "describe": "【有效期至2020-08-01】适度水解蛋白低敏配方，在每日所需基本营养配方的基础上，对牛奶蛋白进行部分水解。不含蔗糖及乙基香兰素：口味清淡，奶味香醇，宝宝更易接受。新老包装随机发货。",
        "standards": {
            "title": "阶段",
            "standards": [
                "一段",
                "二段",
                "三段"
            ]
        },
        "count": 1,
        "type": "全球奶粉",
        "Status": 0,
        "productId": "0001",
        value: undefined,
        "path":"",
        "pathSwitch":0
    }

    add =  (arguements) => {
        let result =  goodsApi.addGoods(arguements)
        result.then(data=>{
            if(data.code===403){
                this.setState({
                  loading: false,  //关闭loading
                })
                console.log(this);
                this.props['CHANGE_LimitShow']();
                return   
              }   
        }).then(()=>{
            this.props.history.replace('/admin/shop/ShopList')
        })
        console.log('传输成功', arguements)
    }
    onChange = value => {
        console.log(value);
        this.setState({ value });

    };
    ImgRefChange= async ()=>{
        let file=this.refs.img.files[0]
        console.log('file变更测试',file)
        if(file === undefined){
            await this.setState({pathSwitch:0,imgUrl:null})
        }else{
            await this.setState({pathSwitch:1})
        }
    }
    updateImg=  ()=>{
        //获取图片信息
        let file=this.refs.img.files[0] 
        let  {size,type} =file
        let types=['jpg','png','gif','jpeg']
         
        if(size>1000000){return message.warning('图片超过1M规定大小')}
        if(types.indexOf(type.split('/')[1])===-1){return message.warning('只允许jpg,jpeg,gif,png四种类型')}
        console.log(file)
        //将图片转化为formdata
        let fromdata=new FormData()
         
        fromdata.append('hehe',file)
        // let result = await goodsApi.picUpdate(fromdata)
        let result =  axios.post('http://47.97.244.129:3002/upload',fromdata)
        result.then((pramas)=>{
            this.setState({imgUrl:config.serverIp+pramas.path})
            console.log(this.state.imgUrl)
        })
    }
    render() {
        // let url = null
        let {imgUrl,pathSwitch}=this.state
        return (
            <div className={style.box}>

                <Card title='商品添加' className={style.Card}>
                    <div className={style.center}>
                            标题<Input placeholder="请输入标题" allowClear onChange={(e) => {
                            this.setState({ title: e.target.value })
                            }} /><br />
                             
                            商品名称<Input placeholder="请输入商品名称" allowClear onChange={(e) => {
                            this.setState({ productName: e.target.value })
                            }} /><br />
                            商品ID<Input placeholder="请输入商品名称" allowClear onChange={(e) => {
                            this.setState({ productId: e.target.value })
                            }} /><br />
                            商品状态值
                            <TreeSelect showSearch style={{ width: '100%' }} value={this.state.value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="Please select" allowClear treeDefaultExpandAll onChange={this.onChange}>
                            <TreeNode value="1" title="上架"></TreeNode>
                            <TreeNode value="-1" title="待上架"></TreeNode>
                            <TreeNode value="0" title="下架"></TreeNode>
                            </TreeSelect>
                            原价<Input prefix="￥" suffix="RMB" onChange={(e) => {
                            this.setState({ originalPrice: e.target.value })
                            }}
                            /><br />
                            现价<Input prefix="￥" suffix="RMB" onChange={(e) => {
                            this.setState({ currentPrice: e.target.value })
                            }}
                            /><br />


                            商品数量<Input placeholder="请输入商品数量" allowClear onChange={(e) => {
                            this.setState({ count: e.target.value })
                            }} /><br />
                            商品种类<Input placeholder="请输入商品类别" allowClear onChange={(e) => {
                            this.setState({ type: e.target.value })
                            }} /><br />
                            商品描述<TextArea placeholder="请写入商品的描述" allowClear onChange={(e) => {
                            this.setState({ describe: e.target.value })
                            }} />
                            <p>请上传图片</p>
                            <input type="file" ref='img' onChange={this.ImgRefChange}></input><br/><img alt='' src={ imgUrl} width={100} height={100}  className={imgUrl?style.block:style.none}/>
                            <br/>
                            <Button onClick={()=>{
                               if(pathSwitch===0){
                                   return false
                               }else{
                                   this.updateImg()
                               }
                            }}>图片上传</Button><br/>

                            <Button className={style.submit} onClick={() => {
                            this.add(this.state)
                            }}>提交商品数据</Button>
                    </div>
                    
                </Card>

            </div>
        );
    }
}

 
export default connect(state=>state,(dispath)=>{
    return bindActionCreators(actionCreator,dispath)
  })(ShopAdd);


/*
商品添加
1.用户输入信息
2.获取用户输入的信息
3.调用添加接口
4.添加成功之后，可以保持不动也可以跳转回列表页
*/