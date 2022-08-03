import React, { useState } from "react";

import {
  useTitle,
  CanAccess,
  ITreeMenu,
  useMenu,
  useRefineContext,
  useRouterContext,
  useLogout,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Icons, Typography } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

const { UnorderedListOutlined, LogoutOutlined } = Icons;

export const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { Link } = useRouterContext();
  const { hasDashboard } = useRefineContext();
  const Title = useTitle();
  const { mutate: logout } = useLogout();

  const { SubMenu } = Menu;

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const breakpoint = Grid.useBreakpoint();

  const isMobile = !breakpoint.lg;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={route}
            icon={icon ?? <UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {hasDashboard && (
          <Menu.Item
            key="dashboard"
            style={{
              fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
            icon={<Icons.DashboardOutlined />}
          >
            <Link to="/">Dashboard</Link>
            {!collapsed && selectedKey === "/" && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        )}
        {renderTreeView(menuItems, selectedKey)}
        <Menu.Item
          style={{
            backgroundColor: "#850101",
            width: "90%",
            justifyContent: "center",
            borderRadius: "5px",
          }}
          key="logout"
          onClick={() => {
            logout();
          }}
          icon={<LogoutOutlined />}
        >
          <Typography.Text style={{ color: "white" }} strong>
            Logout
          </Typography.Text>
        </Menu.Item>
      </Menu>
    </AntdLayout.Sider>
  );
};
