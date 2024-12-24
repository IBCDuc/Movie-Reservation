import { Modal, Form, Divider, Row, Col, Input, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { callAddSeat, callBookSeats } from '~/services/api';

const ModalBooking = (props) => {
  const { open, setOpen, bookingData } = props;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const accountUser = useSelector((state) => state.account.user);
  const navigate = useNavigate();

  // const userID = `${accountUser?.id}`;
  // const tourID = `${tourId}`;

  useEffect(() => {
    if (bookingData) {
      form.setFieldsValue({
        userId: bookingData.userId,
        showtimeId: bookingData.showtimeId,
        seatIds: bookingData.seatIds,
        totalPrice: bookingData.totalPrice,
        status: 'pending'
      });
    }
  }, [bookingData]);


  const onFinish = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      notification.error({
        message: 'Not logged in',
        description: 'Please login to book seats',
      });
      return;
    }

    try {
      setIsSubmit(true);
      const res = await callBookSeats(bookingData);
      if (res && res.success) {
        message.success('Booking successful!');
        setOpen(false);
        navigate('/');
      }
    } catch (error) {
      message.error('Booking failed');
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Modal
        forceRender
        title="Confirm Movie Booking"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        okText="Book Movie"
        cancelText="Cancel"
        confirmLoading={isSubmit}
        
        maskClosable={false}
        style={{ top: '40%' }}
      >
        <Row>Are you sure you want to book this seat?</Row>
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label="User ID"
                name="id_user"
                hidden={true}
                labelCol={{ span: 24 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: '0 10px' }}>
              <Form.Item
                label="Room ID"
                name="id_room"
                hidden={true}
                labelCol={{ span: 24 }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalBooking;
