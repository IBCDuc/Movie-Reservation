import { Modal, Form, Input, Select, InputNumber, Checkbox, Row, Col, DatePicker, message, notification } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
// import moment from "moment"; // Import moment.js để làm việc với ngày tháng
import Seatmap from "react-seatmap";
const ModalCreateShowtime = ({ open, setOpen, fetchGetShowtimes }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const movieOptions = [
    { value: "1", label: "Phim 1" },
    { value: "2", label: "Phim 2" },
    // Thêm phim thực tế ở đây từ API hoặc Redux store
  ];

  const theaterOptions = [
    { value: "Room 1", label: "Phòng chiếu 1" },
    { value: "Room 2", label: "Phòng chiếu 2" },
    // Thêm phòng chiếu thực tế ở đây
  ];

  const serviceOptions = [
    { value: "vip_seat", label: "Ghế VIP" },
    { value: "snacks", label: "Đồ ăn nhẹ" },
    { value: "premium_sound", label: "Âm thanh cao cấp" },
  ];

  const ticketOptions = [
    { value: "standard", label: "Vé thường - 100,000 VND" },
    { value: "vip", label: "Vé VIP - 200,000 VND" },
  ];

  const onFinish = async (values) => {
    setIsSubmitting(true);
    // Giả lập gọi API để thêm buổi chiếu mới
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });

    if (res.success) {
      message.success("Tạo ngày chiếu mới thành công");
      form.resetFields();
      setOpen(false);
      await fetchGetShowtimes();  // Fetch lại danh sách showtimes
    } else {
      notification.error({
        message: "Có lỗi xảy ra!",
        description: "Không thể tạo mới ngày chiếu.",
        duration: 3,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Modal
      title="Tạo mới ngày chiếu"
      visible={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      onOk={() => form.submit()}
      confirmLoading={isSubmitting}
      okText="Tạo mới"
      cancelText="Hủy"
      width="60vw"
      maskClosable={false}
    >
      <Form form={form} name="create-showtime" onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Chọn Phim"
              name="movie_id"
              rules={[{ required: true, message: "Vui lòng chọn phim!" }]}
            >
              <Select
                showSearch
                placeholder="Chọn một phim"
                options={movieOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Chọn ngày chiếu"
              name="show_date"
              rules={[{ required: true, message: "Vui lòng chọn ngày chiếu!" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                // disabledDate={(current) => current && current < moment().startOf("day")}
                placeholder="Chọn ngày chiếu"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Giờ chiếu"
              name="show_time"
              rules={[{ required: true, message: "Vui lòng chọn giờ chiếu!" }]}
            >
              <Input type="time" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số lượng ghế"
              name="seats_count"
              rules={[{ required: true, message: "Vui lòng nhập số lượng ghế!" }]}
            >
              <InputNumber min={1} max={1000} defaultValue={1} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Chọn phòng chiếu"
              name="theater_room"
              rules={[{ required: true, message: "Vui lòng chọn phòng chiếu!" }]}
            >
              <Select
                placeholder="Chọn phòng chiếu"
                options={theaterOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Dịch vụ kèm theo" name="services">
              <Select
                mode="multiple"
                placeholder="Chọn dịch vụ"
                options={serviceOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mức giá vé"
              name="ticket_price"
              rules={[{ required: true, message: "Vui lòng chọn mức giá vé!" }]}
            >
              <Select
                placeholder="Chọn mức giá vé"
                options={ticketOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mô tả"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Nhập mô tả về buổi chiếu" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </Modal>
  );
};

export default ModalCreateShowtime;
