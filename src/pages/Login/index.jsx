import React, { memo } from 'react'
import { Form, Button, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const Login = memo(() => {
  return (
    <div className="formContainer">
      <div className="login-title">VitaminC后台管理系统</div>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className='form-button'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              重置
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
})

export default Login