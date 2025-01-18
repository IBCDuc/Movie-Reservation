import { Modal, Form, Input, Select, InputNumber, Checkbox, Row, Col, DatePicker, message, notification } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
// import moment from "moment"; // Import moment.js to work with dates
import Seatmap from "react-seatmap";

const ModalCreateShowtime = ({ open, setOpen, fetchGetShowtimes }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const movieOptions = [
    { value: "1", label: "Movie 1" },
    { value: "2", label: "Movie 2" },
    // Add real movies here from an API or Redux store
  ];

  const theaterOptions = [
    { value: "Room 1", label: "Screening Room 1" },
    { value: "Room 2", label: "Screening Room 2" },
    // Add real screening rooms here
  ];

  const serviceOptions = [
    { value: "vip_seat", label: "VIP Seat" },
    { value: "snacks", label: "Snacks" },
    { value: "premium_sound", label: "Premium Sound" },
  ];

  const ticketOptions = [
    { value: "standard", label: "Standard Ticket - 100,000 VND" },
    { value: "vip", label: "VIP Ticket - 200,000 VND" },
  ];

  const onFinish = async (values) => {
    setIsSubmitting(true);
    // Simulate API call to create a new showtime
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });

    if (res.success) {
      message.success("Successfully created a new showtime.");
      form.resetFields();
      setOpen(false);
      await fetchGetShowtimes();  // Fetch the updated list of showtimes
    } else {
      notification.error({
        message: "An error occurred!",
        description: "Unable to create a new showtime.",
        duration: 3,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Modal
      title="Create New Showtime"
      visible={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      onOk={() => form.submit()}
      confirmLoading={isSubmitting}
      okText="Create"
      cancelText="Cancel"
      width="60vw"
      maskClosable={false}
    >
      <Form form={form} name="create-showtime" onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Select Movie"
              name="movie_id"
              rules={[{ required: true, message: "Please select a movie!" }]}
            >
              <Select
                showSearch
                placeholder="Select a movie"
                options={movieOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Select Date"
              name="show_date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                // disabledDate={(current) => current && current < moment().startOf("day")}
                placeholder="Select a date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Showtime"
              name="show_time"
              rules={[{ required: true, message: "Please select a time!" }]}
            >
              <Input type="time" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Number of Seats"
              name="seats_count"
              rules={[{ required: true, message: "Please enter the number of seats!" }]}
            >
              <InputNumber min={1} max={1000} defaultValue={1} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Select Screening Room"
              name="theater_room"
              rules={[{ required: true, message: "Please select a screening room!" }]}
            >
              <Select
                placeholder="Select a screening room"
                options={theaterOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Additional Services" name="services">
              <Select
                mode="multiple"
                placeholder="Select services"
                options={serviceOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ticket Price"
              name="ticket_price"
              rules={[{ required: true, message: "Please select a ticket price!" }]}
            >
              <Select
                placeholder="Select ticket price"
                options={ticketOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Enter a description of the showtime" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </Modal>
  );
};

export default ModalCreateShowtime;
