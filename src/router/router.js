import React  from 'react';
import { HashRouter, Route,Redirect,Switch  } from 'react-router-dom'  //引入路由
import loadable from '../utils/loadable'

// 下面引入组件

// import Login from '@pages/Login'  //引入登录组件
// import Admin from '@pages/Admin'  //引入管理组件




const Login = loadable(()=>import('@pages/Login'))
const Admin = loadable(()=>import('@pages/Admin'))
const Home = loadable(()=>import('@pages/Home/home'))
const ShopList = loadable(()=>import('@pages/Shop/ShopList'))
const ShopAdd = loadable(()=>import('@pages/Shop/ShopAdd'))
const ShopUpdate = loadable(()=>import('@pages/Shop/ShopUpdate'))
const User = loadable(()=>import('@pages/User'))
const admins = loadable(()=>import('@pages/administrator/index'))
const orderList = loadable(()=>import('@pages/order/orderList'))
const orderAudit = loadable(()=>import('@pages/order/orderAudit'))
const Error = loadable(()=>import('@pages/Error/error'))
const Classify = loadable(()=>import('@pages/Classify'))
const Log = loadable(()=>import('@pages/Log'))

const Bar = loadable(()=>import('@pages/Echarts/Bar'))
const Line = loadable(()=>import('@pages/Echarts/Line'))
const Pie = loadable(()=>import('@pages/Echarts/Pie'))



    const Routers = () => (
        // 设置路由 
        <HashRouter>
          <Switch>
            {/* 重定向  默认进入login页面 */}
            <Redirect from='/' to='/admin' exact/>
            {/* 一级路由模板   路径对应组件 */}
            <Route path='/login' component={Login}></Route>
            {/* 嵌套路由模板 */}
            <Route path='/admin' render={()=>{  
              return(
                <Admin>
                  <Switch>
                    <Redirect from='/admin' to='/admin/home' exact/>
                    <Route exact path='/admin/home' component={Home}></Route> 
                    
                    {/* 商品管理路由 */}
                    <Route exact path='/admin/shop/shopList' component={ShopList}></Route> 
                    <Route exact path='/admin/shop/shopAdd' component={ShopAdd}></Route> 
                    <Route exact path='/admin/shop/ShopUpdate/:id' component={ShopUpdate}></Route> 
                    {/* 管理管理路由 */}
                    <Route exact  path='/admin/administrator' component={admins}></Route>

                    {/* 用户管理 */}
                    <Route exact path='/admin/user' component={User}></Route>
    
                    {/* 订单管理的路由 */}
                    <Route exact path='/admin/order/List'   component={orderList}></Route>
                    <Route exact path='/admin/order/Audit'  component={orderAudit}></Route>   
                  
                    
                    {/* 商品分类的路由 */}
                    <Route exact path='/admin/type/find'   component={Classify}></Route>
                    
                    {/* 图表路由 */}

                    <Route exact path='/admin/echarts/pie'   component={Pie}></Route>
                    <Route exact path='/admin/echarts/bar'   component={Bar}></Route>
                    <Route exact path='/admin/echarts/line'   component={Line}></Route>
                    {/* 系统日志 */}
                    <Route exact path='/admin/log'   component={Log}></Route>
                    <Route component={Error}></Route>
                  </Switch> 
                </Admin>
              )
            }}>
            </Route>
          </Switch>
        </HashRouter>
      )

  
  
  
  
  export default Routers;
  
  