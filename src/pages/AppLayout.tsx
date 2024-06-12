import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import HeaderCom from '../components/HeaderCom/HeaderCom';
const { Header, Sider, Content } = Layout;
function getItem<T>(
  label: string,
  key: string,
  icon?: any,
  children?: Array<T> | null,
  path?: string,
  type?: string) {
  return {
    key,
    icon,
    children,
    label,
    path,
    type,
  };
}

const menuItems = [
  getItem("调度平台", "sub2", <AppstoreOutlined />, [
    getItem("流程进度", "/flow/FlowProgress"),
    getItem("Option 6", "6"),
  ]),
  getItem("规则引擎", "rule", <MailOutlined />, [
    getItem("左因子表", "/rule/LeftFactor", null, null, "/rule/LeftFactor"),
    getItem("右因子表", "/rule/RightFactor", null, null, "/rule/RightFactor"),
    getItem("左因子关联表", "/rule/LeftRelate", null, null, "/rule/LeftRelate"),
    getItem(
      "右因子关联表",
      "/rule/RightRelate",
      null,
      null,
      "/rule/RightRelate"
    ),
  ]),
  getItem("控制中心", "sub4", <SettingOutlined />, [
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const gotoRoute = (key: string) => {
    navigate(key, { replace: true });
  };

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={["/flow/FlowProgress", "6"]}
          defaultSelectedKeys={["/flow/FlowProgress"]}
          items={menuItems}
          onSelect={(item) => gotoRoute(item.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderCom collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};
export default AppLayout;