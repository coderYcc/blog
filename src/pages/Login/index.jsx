import React, { memo } from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom' // React Router v5
import {
  LoginWrapper
} from './style.js'
import { blogLoginIn } from '../../network/login.js'
import { useAuth } from '../../hooks/useAuth.js'

const Login = memo((props) => {
  const [form] = Form.useForm()
  const { history } = props
  const { login } = useAuth() || {}

  /**
   * @description: 登录
   */
  const handleLogin = async () => {
    try {
      const values = await form.validateFields()
      const { username, password } = values
      // 显示加载状态
      const btn = message.loading('登录中...', 0)
      // 调用登录接口
      const response = await blogLoginIn({ username, password })
      // 关闭加载状态
      btn()
      // 处理登录成功逻辑
      if (response.code === 200 && response.token) {
        // 保存token到本地存储
        login({userInfo: 123, token: response.token})
        message.success('登录成功')
        history.push('/admin')
      } else {
        message.error(response.message || '登录失败')
      }
    } catch (error) {
      message.error('登录失败，请检查网络或凭证')
    }
  }

  /**
   * @description: 重置
   */
  const handleReset = () => {
    form.resetFields()
  }

  return (
    <LoginWrapper>
      <div className="formContainer">
        <div className="login-title">VitaminC后台管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          form={form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <div className='form-button'>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
                登录
              </Button>
              <Button type="default" htmlType="button" className="login-form-button" onClick={handleReset}>
                重置
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  );
})

// 使用withRouter高阶组件注入history对象（React Router v5）
export default withRouter(Login)    