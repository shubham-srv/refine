import { useState } from "react";
import { IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import {
  Create,
  Form,
  Input,
  Select,
  useSelect,
  useForm,
  Row,
  Col,
  Button,
  SaveButton,
  Space,
  Icons,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";

const createButtonText = <span>Add</span>;

const { CloseOutlined } = Icons;

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { formProps, saveButtonProps } = useForm<IPost>();
  const newSaveButtonProps = { ...saveButtonProps, children: createButtonText };

  const { goBack } = useNavigation();

  const actionButtons = (
    <Space>
      <Button icon={<CloseOutlined />} danger onClick={() => goBack()}>
        Cancel
      </Button>
      <SaveButton {...newSaveButtonProps}></SaveButton>
    </Space>
  );

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create actionButtons={actionButtons}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    label: "published",
                    value: "published",
                  },
                  {
                    label: "draft",
                    value: "draft",
                  },
                  {
                    label: "rejected",
                    value: "rejected",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name={["category", "id"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...categorySelectProps} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ReactMde
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
