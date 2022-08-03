import React from "react";
import { useLogin } from "@pankod/refine-core";
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "@pankod/refine-antd";

import "./login.css";
import { Logo } from "images";

const { Text, Title } = Typography;

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();

  const { mutate: login } = useLogin<ILoginForm>();

  const CardTitle = (
    <Title level={3} className="title">
      Sign in your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <div className="imageContainer">
              <img src={Logo} alt="Refine Logo" />
            </div>
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values);
                }}
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <div style={{ marginBottom: "12px" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>

                  <Button
                    style={{
                      float: "right",
                      fontSize: "12px",
                    }}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Button type="primary" size="large" htmlType="submit" block>
                  Sign in
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Don’t have an account?{" "}
                  <Button style={{ fontWeight: "bold" }}>Sign up</Button>
                </Text>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};
