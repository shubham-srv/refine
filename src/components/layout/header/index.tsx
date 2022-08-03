import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  AntdLayout,
  Typography,
  Avatar,
  Space,
  Icons,
} from "@pankod/refine-antd";

const { Text } = Typography;

const style: React.CSSProperties = {
  cursor: "pointer",
  fontSize: "24px",
};

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  const { UserOutlined } = Icons;

  const shouldRenderHeader = user && (user.username || user.avatar);

  return shouldRenderHeader ? (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Space size={24}>
        {user.username && (
          <Text ellipsis strong style={style}>
            {user.username}
          </Text>
        )}
        {user &&
          (user.avatar ? (
            <Avatar size="large" src={user?.avatar} alt={user?.name} />
          ) : (
            <UserOutlined style={style} />
          ))}
      </Space>
    </AntdLayout.Header>
  ) : null;
};
