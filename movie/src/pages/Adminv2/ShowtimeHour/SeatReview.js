import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Space, Modal, Select, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';

const AddSeatsForm = ({open, setOpen}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log('Form values:', values);
    // Gửi dữ liệu lên server hoặc xử lý thêm
  };

  return (
    <Modal
      title="Add The"
      visible={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      onOk={() => form.submit()}
      // confirmLoading={isSubmitting}
      okText="Tạo mới"
      cancelText="Hủy"
      width="60vw"
      maskC
      losable={false}
    >
    <Form
      form={form}
      name="add_seats"
      onFinish={handleFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="room"
            label="Phòng Chiếu"
            rules={[{ required: true, message: 'Vui lòng chọn phòng chiếu' }]}
          >
          <Select
                showSearch
                placeholder="Choose cinema"
                // options={movieOptions}
          />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.List
            name="seats"
            initialValue={[{}]}
            rules={[
              {
                validator: async(_, seats) => {
                  if (!seats || seats.length < 1) {
                    return Promise.reject(new Error('Phải có ít nhất một hàng ghế'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'row']}
                      fieldKey={[fieldKey, 'row']}
                      label="Tên Hàng Ghế"
                      rules={[{ required: true, message: 'Vui lòng nhập tên hàng ghế' }]}
                    >
                      <Input placeholder="Ví dụ: A" style={{ height: '31px' }} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'numSeats']}
                      fieldKey={[fieldKey, 'numSeats']}
                      label="Số Ghế"
                      rules={[{ required: true, message: 'Vui lòng nhập số ghế' }]}
                    >
                      <InputNumber min={1} placeholder="5" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                      label="Giá Ghế"
                      rules={[{ required: true, message: 'Vui lòng nhập giá ghế' }]}
                    >
                      <InputNumber min={0} placeholder="100000" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm Hàng Ghế
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </Form>

  </Modal>
  );
};

export default AddSeatsForm;
