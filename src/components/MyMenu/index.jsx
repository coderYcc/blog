import React, { memo } from 'react'
import { Menu, Layout} from 'antd';
import { NavLink } from 'react-router-dom';
import { 
  PictureOutlined, 
  ProfileOutlined,
  FireOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Sider } = Layout

const MyMenu = memo((props) => {
  const {collapsed} = props
  const selectKeys = [props.location.pathname]
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} >
      <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
        <div className='logo'>悦步后台管理系统</div>
        <div style={{flex:'1',overflow:'auto'}}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={selectKeys}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme='dark'
          >
            <Menu.Item key="/home/share" icon={<PictureOutlined />}>
              <NavLink to="/home/share">动态管理</NavLink>
            </Menu.Item>
            <Menu.Item key="/home/compete" icon={<ProfileOutlined />}>
              <NavLink to="/home/compete">赛事管理</NavLink>
            </Menu.Item>
            <Menu.Item key="/home/run" icon={<FireOutlined />}>
              <NavLink to="/home/run">跑步管理</NavLink>
            </Menu.Item>
            <Menu.Item key="/home/shop" icon={<ShoppingOutlined />}>
              <NavLink to="/home/shop">商城管理</NavLink>
            </Menu.Item>
            <Menu.Item key="/home/user" icon={<UserOutlined />}>
              <NavLink to="/home/user">用户管理</NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>     
    </Sider>
  )
})

export default MyMenu