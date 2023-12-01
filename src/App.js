import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import SubMenu from 'antd/es/menu';
import routes from './routes';
import './App.css';


const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, path, type) {
  return {
    key,
    icon,
    children,
    label,
    path,
    type,
  };
}

const items = [
  getItem('规则引擎', 'sub1', <MailOutlined />, [
    getItem('左因子表', '/LeftFactor', null, null, '/LeftFactor'),
    getItem('右因子表', '/RightFactor', null, null, '/RightFactor')
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onSelect={item => console.log(item.key)}
        /> */}
        <Menu theme="dark" mode="inline">
          {items.map(item => (
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map(childItem => (
                  <Menu.Item key={childItem.key}>
                    <Link to={childItem.path}>{childItem.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            {routes.map(route => (
              route.children ? (
                  route.children.map(childItem => (
                    <Route key={childItem.path} exact path={childItem.path} Component={childItem.component} />
                  ))
              ) : (
                <Route key={route.path} exact path={route.path} Component={route.component} />
              )
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </Router>
  );
};
export default App;