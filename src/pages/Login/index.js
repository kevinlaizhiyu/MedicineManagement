import React, { Component } from 'react'
import style from './index.module.less'
import api from '@api/loginAPI'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
class Login extends Component {
  state = { check: false }

  login = () => {
    let Tpass = ''
    let { validateFields } = this.props.form //用户获取表单数据的值
    // 校验输入的值
    validateFields((err, data) => {
      // console.log(err,data)
      if (err) {
        // 输入错误
        message.error('输入有误请重试')
      } else {
        api.login(data).then((res) => {
          // console.log(res)
          if (res.code === 404) {
            message.error('用户名密码错误')
          } else {
            if (res.stack) {
              message.error('该账号被禁用')
            } else {
              if (this.state.check) {
                Tpass = data.passWord//  勾选记住密码将密码存入localStorage,否则存入的密码vlaue为空
              }
              let userMsg = {
                'userName': data.userName,
                'passWord': Tpass,
                'token': res.token
              }
              // 登录成功获取token并且保存到localstorage里 
              localStorage.setItem('userMsg', JSON.stringify(userMsg))
              message.success('登录成功，3s后跳转首页', 3, () => {
                this.props.history.replace('/admin')
              })
            }
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // getFieldDecorator返回一个高阶组件 用于和表单进行双向数据绑定
    let { check } = this.state;
    return (
      <div className={style['login-box']}>
        {/* <p>皮噜娃商城后台管理系统</p> */}
        <div className={style['login-form']}>
          {/* 用户名 */}
          <Form.Item>
            {/* userName 参数1获取第一个数据的key值 */}
            {getFieldDecorator('userName', {
              rules: [{ requied: true, message: '用户名必须存在' },
              { min: 3, message: '用户名最小长度3位' },
              { max: 9, message: '用户名最大长度9位' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          {/* 用户密码 */}
          <Form.Item>
            {getFieldDecorator('passWord', {
              rules: [{ requied: true, message: '用户名必须存在' },
              { min: 3, message: '用户名最小长度3位' },
              { max: 9, message: '用户名最大长度9位' }]
            })(
              <Input.Password
                prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="PassWord"
              />
            )}
          </Form.Item>
          {/* 记住我  提交*/}
          <Form.Item>
            <Checkbox onClick={() => {
              this.setState({ check: !check })
            }} >记住密码</Checkbox>
            <span className="login-form-forgot" style={{ color: 'rgba(245, 133, 6,.75)' }}>
              忘记密码
          </span>
            <br />
            <Button type="primary" onClick={this.login} className="login-form-button" style={{ marginLeft: '187px' }}>
              登录
          </Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}
// 通过Form 下的create的方法将组件进行处理  会将antd里的方法注册到 当前组件的Props里（解决找不到getFieldDecorator）
export default Form.create()(Login);