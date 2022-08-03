import { useState } from "react";
import { IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import {
  Edit,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
  Col,
  Row,
  Icons,
  Space,
  Button,
  SaveButton,
} from "@pankod/refine-antd";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost } from "interfaces";

const { CloseOutlined } = Icons;

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { goBack } = useNavigation();

  const { formProps, saveButtonProps, queryResult } = useForm<IPost>();
  const actionButtons = (
    <Space>
      <Button icon={<CloseOutlined />} danger onClick={() => goBack()}>
        Cancel
      </Button>
      <SaveButton {...saveButtonProps}>Update</SaveButton>
    </Space>
  );

  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
  });

  return (
    <Edit actionButtons={actionButtons}>
      <Form {...formProps} layout="vertical">
        <Row gutter={12}>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row gutter={12}>
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
    </Edit>
  );
};
