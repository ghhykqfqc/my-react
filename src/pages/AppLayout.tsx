import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import HeaderCom from '@/components/HeaderCom/HeaderCom';
const { Header, Sider, Content } = Layout;
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

function getItem<T>(
  label: string,
  key: string,
  path: string,
  icon?: any,
  children?: Array<T> | null,
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
  getItem("调度平台", "flow", '/flow', <AppstoreOutlined />, [
    getItem("流程属性", "/flow/FlowAttr", "/flow/FlowAttr", null, null),
    getItem("流程进度", "/flow/FlowProgress", "/flow/FlowProgress", null, null),
  ]),
  getItem("规则引擎", "rule", '/rule', <MailOutlined />, [
    getItem("左因子表", "/rule/LeftFactor", "/rule/LeftFactor", null, null),
    getItem("右因子表", "/rule/RightFactor", "/rule/RightFactor", null, null),
    getItem("左因子关联表", "/rule/LeftRelate", "/rule/LeftRelate", null, null),
    getItem("右因子关联表", "/rule/RightRelate", "/rule/RightRelate", null, null),
  ]),
  getItem("会话引擎", "chat", '/chat', <AppstoreOutlined />, [
    getItem("翻译", "/chat/Translate", "/chat/Translate", null, null),
  ]),
  getItem("控制中心", "sub4", '/sub4', <SettingOutlined />, [
    getItem("Submenu", "sub3", '/sub3', null, [
      getItem("Option 7", "7", "/7"),
      getItem("Option 8", "8", "/8"),
    ]),
    getItem("Option 9", "9", "/9"),
    getItem("Option 10", "10", "/10"),
    getItem("Option 11", "11", "/11"),
    getItem("Option 12", "12", "/12"),
  ]),
];

const AppLayout = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['flow']);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const gotoRoute = (path: string) => {
    navigate(path, { replace: true });
  };
  
  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/flow/FlowAttr"]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
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