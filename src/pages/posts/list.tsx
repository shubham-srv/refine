import React from "react";
import { debounce } from "lodash";
import { IResourceComponentsProps, useMany } from "@pankod/refine-core";
import {
  Menu,
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  useSelect,
  TagField,
  Dropdown,
  FilterDropdown,
  Select,
  ShowButton,
  useModalForm,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Icons,
  Button,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

const setTagColor = (tag: string) => {
  switch (tag) {
    case "rejected":
      return "error";

    case "draft":
      return "#29375F";

    case "published":
      return "success";

    default:
      return "";
  }
};

const { PlayCircleOutlined, StopOutlined } = Icons;

// custom tag and live info
const setLiveInfo = (tag: string) => {
  if (tag === "rejected") {
    return (
      <Button icon={<StopOutlined />} disabled>
        Inactive
      </Button>
    );
  }

  if (tag === "draft" || tag === "published") {
    return (
      <Button
        icon={<PlayCircleOutlined />}
        style={{ color: "green", borderColor: "green" }}
      >
        Active
      </Button>
    );
  }
};

// List Component
export const PostList: React.FC<IResourceComponentsProps> = () => {
  const statusMenuItems = (
    <Menu
      selectable
      items={[
        {
          onClick: (info) => {
            setFilters([{ field: "status", operator: "eq", value: "draft" }]);
          },
          key: "1",
          label: <TagField value="draft" color={setTagColor("draft")} />,
        },
        {
          onClick: (info) => {
            setFilters([
              { field: "status", operator: "eq", value: "published" },
            ]);
          },
          key: "2",
          label: (
            <TagField value="published" color={setTagColor("published")} />
          ),
        },
        {
          onClick: (info) => {
            setFilters([
              { field: "status", operator: "eq", value: "rejected" },
            ]);
          },
          key: "3",
          label: <TagField value="rejected" color={setTagColor("rejected")} />,
        },
      ]}
    />
  );
  // const [postList, setPostList] = useState<IPost[]>([]);
  // const [defaultData, setDefaultData] = useState<IPost[]>([]);

  // const dataProvider = useDataProvider();
  // const defaultDataProvider = dataProvider();
  // defaultDataProvider.getList({ resource: "posts" }).then((data) => {
  //   const dataObj = [...data?.data];
  //   // console.log(dataObj);
  //   // dataObj.forEach((eachData)=> {
  //   //   setDefaultData((prevData)=> ([...prevData, eachData]))
  //   // })
  // });

  // const { refetch: refetchPosts } = useList<IPost>({
  //   resource: "posts",
  //   config: {
  //     filters: [{ field: "title", operator: "contains", value: searchValue }],
  //     hasPagination: false,
  //   },
  //   queryOptions: {
  //     enabled: false,
  //     onSuccess: (data) => {
  //       console.log(data);
  //       console.log(data.data);
  //       const newData = data.data;
  //       setPostList((prevData) => {
  //         return [...prevData, ...newData];
  //       });
  //     },
  //   },
  // });

  // useEffect(() => {
  //   setPostList([]);
  //   refetchPosts();
  // }, [searchValue, refetchPosts]);

  const { tableProps, sorter, setFilters } = useTable<IPost>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  // action for modal forms
  const {
    formProps: createFormProps,
    modalProps: createModalProps,
    show: createModal,
  } = useModalForm({ action: "create" });
  const {
    formProps: editFormProps,
    modalProps: editModalProps,
    show: editModal,
  } = useModalForm({ action: "edit" });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <>
      <List createButtonProps={{ onClick: () => createModal() }}>
        <Space
          style={{
            float: "right",
            position: "absolute",
            top: "2.2vh",
            right: "10vw",
          }}
        >
          <Dropdown overlay={statusMenuItems} placement="bottom">
            <Button>Status</Button>
          </Dropdown>
          <Input
            onChange={debounce((e) => {
              setFilters([
                { field: "title", operator: "contains", value: e.target.value },
              ]);
            }, 500)}
            placeholder="search by title"
          />
        </Space>

        <Table {...tableProps} rowKey="id" scroll={{ y: "60vh" }}>
          <Table.Column
            dataIndex="id"
            key="id"
            title="ID"
            render={(value) => <TextField value={value} />}
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter
          />
          <Table.Column
            dataIndex="title"
            key="title"
            title="Title"
            render={(value) => <TextField value={value} />}
            defaultSortOrder={getDefaultSortOrder("title", sorter)}
            sorter
          />
          <Table.Column
            dataIndex="status"
            key="liveInfo"
            title="Live Info"
            render={(value) => setLiveInfo(value)}
          />
          <Table.Column
            dataIndex="status"
            key="status"
            title="Status"
            render={(value) => {
              if (value)
                return <TagField value={value} color={setTagColor(value)} />;
            }}
            defaultSortOrder={getDefaultSortOrder("status", sorter)}
            sorter
          />
          <Table.Column
            dataIndex="createdAt"
            key="createdAt"
            title="Created At"
            render={(value) => <DateField value={value} format="LLL" />}
            defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
            sorter
          />
          <Table.Column
            dataIndex={["category", "id"]}
            title="Category"
            render={(value) => {
              if (isLoading) {
                return <TextField value="Loading..." />;
              }

              return (
                <TextField
                  value={
                    categoriesData?.data.find((item) => item.id === value)
                      ?.title
                  }
                />
              );
            }}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Category"
                  {...categorySelectProps}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            render={(_value, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  onClick={() => editModal(record.id)}
                />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>

      {/* -------  modal form for create functionality starts here ---------*/}

      <Modal {...createModalProps}>
        <Form {...createFormProps} layout="vertical">
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
        </Form>
      </Modal>

      {/* Modal for Edit functionality */}

      <Modal {...editModalProps}>
        <Form {...editFormProps} layout="vertical">
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
        </Form>
      </Modal>
    </>
  );
};
