import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Col,
  Row,
  InputNumber,
  Divider,
  Select,
  message,
  notification,
  Space,
  Button
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';
import { callAddSeat, callGetCinema } from '~/services/api';

const AddSeatsForm = ({ open, setOpen, dataView2, fetchGetRoomTour }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  let movieOptions = dataView2?.map((item) => {
    return {
      value: item.cinemaId,
      label: item.cinemaName,
    };
  });

  const typeOptions = [{
    value: 'Regular',
    label: 'Regular'
  },
  {
    value: 'Vip',
    label: 'Vip'
  }]

  const handleFinish =  async (values) => {
    console.log(values)
    const { CinemaId, seats } = values;
      setIsSubmit(true);
      for (let i = 0; i < seats.length; i++ ) {
        const res = await callAddSeat(seats[i].row, seats[i].numbers, seats[i].type, CinemaId);
        console.log(res)
        if (res != "something wrong here!!!" ) {
          message.success("Tạo ngày chiếu mới thành công");
          form.resetFields();
          setOpen(false);
          await fetchGetRoomTour();
        } else if (res == "something wrong here!!!") {
          notification.error({
            message: "Something Wrong Here!",
            description: "Row Duplicated Try Again.",
            duration: 3,
          });
          setIsSubmit(false);
        } else  {
          notification.error({
            message: "Something Wrong Here!",
            description: "Không thể tạo mới ngày chiếu.",
            duration: 3,
          });
          setIsSubmit(false);
      }
    }
  };

  return (
    <Modal
      title="Add Seats"
      visible={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      onOk={() => form.submit()}
      okText="Create"
      cancelText="Cancel"
      width="60vw"
      maskClosable={false}
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
              name="CinemaId"
              label="Cinema Room"
              rules={[{ required: true, message: 'Please select a cinema room' }]}
            >
              <Select
                showSearch
                placeholder="Choose cinema"
                options={movieOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.List
              name="seats"
              initialValue={[{}]}
              rules={[
                {
                  validator: async (_, seats) => {
                    if (!seats || seats.length < 1) {
                      return Promise.reject(new Error('At least one row of seats is required'));
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
                        label="Seat Row Name"
                        rules={[{ required: true, message: 'Please enter the row name' }]}
                      >
                        <Input placeholder="Example: A" style={{ height: '31px' }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'numbers']}
                        fieldKey={[fieldKey, 'type']}
                        label="Numbers"
                        rules={[{ required: true, message: 'Please enter number' }]}
                      >
                        <InputNumber min={0} placeholder="10" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        fieldKey={[fieldKey, 'type']}
                        label="Type"
                        rules={[{ required: true, message: 'type' }]}
                      >
                        <Select
                            showSearch
                            options={typeOptions}
                            placeholder="Regular"
                          />
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
                      Add Seat Row
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
