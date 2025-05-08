import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
const SubmitButton = ({ form, loading, children }) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      style={{ width: "100%" }}
      disabled={!submittable}
      loading={loading}
    >
      {children}
    </Button>
  );
};

const DrawerWithForm = ({
  onClose,
  open,
  onSubmit,
  loading,
  defaultValue,
  title,
}) => {
  const { Option } = Select;
  const [form] = useForm();

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        domain: defaultValue.domain,
        status: defaultValue.status,
        isActive: defaultValue.isActive,
        // createdDate: defaultValue.createdDate
        //   ? defaultValue.createdDate
        //   : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [defaultValue, form]);

  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      open={open}
      placement="left"
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="validateOnly"
        onFinish={onSubmit}
        // initialValues={defaultValue}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="domain"
              label="Domain"
              rules={[
                {
                  required: true,
                  message: "Please enter URL",
                },
                { type: "url", warningOnly: true },
                { type: "url", min: 6 },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Please enter url"
                inputMode="url"
                // defaultValue={defaultValue?.domain}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="createdDate"
              label="DateTime"
              rules={[
                {
                  required: false,
                  message: "Please choose the dateTime",
                  type: "date",
                  //   warningOnly: true,
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement}
                // defaultValue={defaultValue?.createdDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required:  true,
                  message: "Please select status",
                },
              ]}
            >
              <Select
                placeholder="Please select status"
                // defaultValue={defaultValue?.status}
                allowClear
              >
                <Option value="verified">verified</Option>
                <Option value="pending">pending</Option>
                <Option value="rejected">rejected</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isActive"
              label="Activity"
              rules={[
                {
                  required:  true,
                  message: "Please choose the activity",
                },
              ]}
            >
              <Select
                placeholder="Please choose the activity"
                // defaultValue={defaultValue?.isActive}
                allowClear
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Not Active</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={null}>
              <SubmitButton loading={loading} form={form}>
                Submit
              </SubmitButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerWithForm;
