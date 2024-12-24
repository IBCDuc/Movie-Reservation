import {
  Modal,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Upload,
  Select,
  message,
  notification,
  DatePicker,
  theme
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { callAddCinema, callAddSeat } from "../../../services/api";
import { getCategory } from "../../../redux/categoryAD/categorySlice";
import imgUpload from "../../../assets/img-upload.jpg";

const ModalCreateShowtime = (props) => {
  const { open, setOpen, fetchGetRoomTour, setTypeRT } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const userRole = useSelector((state) => state.account.role);

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let options = [
    {
      value: "Open",
      label: "Open"
    },
    {
      value: "Close",
      label: "Close"
    },
    {
      value: "Maintenance",
      label: "Maintenance"
    }
  ];

  const handleFileLogo = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
      setLogoPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  let optionsStatus = [
    {
      value: "1",
      label: "Public"
    },
    {
      value: "0",
      label: "UnPublic"
    }
  ];

  let optionsType = [
    {
      value: "room",
      label: "Room"
    },
    {
      value: "tour",
      label: "Tour"
    }
  ];

  const onFinish = async (value) => {
    const { name, status, link } = value;
    setIsSubmit(true);
    let res = {}; 
    if (userRole == "Admin") {
      res.message = "You don't have create permission!";
    } else {
      res = await callAddCinema(name, status, link);
    }
    console.log(res);
    setIsSubmit(false);
    if (res) {
      console.log("Response check", res);
      message.success("Product created successfully!");
      form.resetFields();
      setOpen(false);
      setTypeRT("&type_room[]=tour");
      await fetchGetRoomTour();
    } else {
      notification.error({
        message: "Something went wrong!",
        description: res.message || "Unable to create product",
        duration: 3
      });
    }
  };

  return (
    <>
      <Modal
        title="Create New Showtime"
        open={open}
        visible={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Create"
        cancelText="Cancel"
        confirmLoading={isSubmit}
        width={"50vw"}
        maskClosable={false}
      >
        <Form
          form={form}
          name="create-showtime"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={15}>
            {/* Cinema Name */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Cinema Name"
                name="name"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please enter Cinema Name!" }]}
              >
                <Input
                  type="text"
                  style={{
                    height: "30px",
                    width: "100%"
                  }}
                />
              </Form.Item>
            </Col>

            {/* Status */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Status"
                name="status"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select status"
                  optionFilterProp="children"
                  options={options}
                />
              </Form.Item>
            </Col>

            {/* Image Link */}
            <Col span={24} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Image Link"
                name="link"
                labelCol={{ span: 24 }}
              >
                <Input
                  placeholder="Image URL"
                  style={{
                    height: "30px",
                    width: "100%"
                  }}
                />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col span={24} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Description"
                name="description"
                labelCol={{ span: 24 }}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter a description for the showtime"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateShowtime;
