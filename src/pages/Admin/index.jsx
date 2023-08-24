import React, { memo, useState } from 'react'
import { menuLinks } from '../../common/local-data';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined, 
  ProfileOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { AdminWrapper } from './style';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const iconData = {
  'MailOutlined': <MailOutlined />,
  'ProfileOutlined': <ProfileOutlined />,
  'FireOutlined': <FireOutlined />,
}
const Admin = memo((props) => {
  const { route } = props
  const [collapsed, setCollapsed] = useState(false);
  // 渲染不含children的目录
  const renderNoChildMenu = (item) => {
    
    return (
      <Menu.Item key={item.title} icon={iconData[item.icon]}>
        <NavLink to={item.link}>{item.title}</NavLink>
      </Menu.Item>
    )
  }
  // 渲染含有children的目录
  const renderChildMenu = (item) => {
    return (
      <SubMenu key={item.title} icon={iconData[item.icon]} title={item.title}>
        { 
          item.children.map((child) => {
            return renderMenu(child)
          })
        }
      </SubMenu>
    )
  }
  // 渲染菜单
  const renderMenu = (item) => {
    return item.children ? renderChildMenu(item) : renderNoChildMenu(item)
  }
  return (
    <AdminWrapper>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
            <div className='logo'>Test Hooks</div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            >
              {
                menuLinks.map((item) => renderMenu(item))
              }
            </Menu>
          </div>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {renderRoutes(route.routes)}
          </Content>
        </Layout>
      </Layout>
    </AdminWrapper>
  )
})

export default Admin