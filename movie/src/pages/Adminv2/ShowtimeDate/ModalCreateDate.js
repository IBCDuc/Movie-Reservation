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
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "~/redux/movieAD/movieSlice";
import {
  callAddShowTimeDate,
  callAddShowTimeHour,
  callGetCinema,
  callGetMovieSearch,
  changeSeatBasedOnShowtime,
} from "../../../services/api";

const ModalCreateShowtime = (props) => {
  const { open, setOpen, fetchGetRoomTour, setTypeRT, data } = props;
  console.log(data);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState({});
  
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  const [tempData, setTempData] = useState({
    movie_id: null,
    show_date: null,
    show_time: null,
    status: null,
  });

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const movieOptions = movies?.map((item) => ({
    value: item.Movie_id,
    label: item.Movie_name,
  }));

  const cinemaOptions = data?.map((item) => ({
    value: item.cinemaId,
    label: item.cinemaName,
  }));

  const statusOptions = [
    { value: "Public", label: "Public" },
    { value: "UnPublic", label: "UnPublic" },
  ];

  const handleMovieChange = (value) => {
    setTempData((prevData) => ({ ...prevData, movie_id: value }));
  };

  const handleDateChange = (value) => {
    setTempData((prevData) => ({ ...prevData, show_date: value }));
  };

  const handleTimeChange = (value) => {
    setTempData((prevData) => ({ ...prevData, show_time: value }));
  };

  const handleStatusChange = (value) => {
    setTempData((prevData) => ({ ...prevData, status: value }));
  };

  const onFinish = async (value) => {
    const { movie_id, show_date, show_time, status, theater_room } = value;
    setIsSubmit(true);
    const res = await callAddShowTimeDate(movie_id, show_date, status);
    const res2 = await callAddShowTimeHour(
      res.data.Showtime_date_id,
      show_time,
      theater_room
    );

    if (res.data && res2.data) {
      message.success("Successfully created a new showtime.");
      form.resetFields();
      setOpen(false);
      await fetchGetRoomTour();
    } else {
      notification.error({
        message: "An error occurred!",
        description: "Failed to create a new showtime.",
        duration: 3,
      });
      setIsSubmit(false);
    }
  };

  return (
    <Modal
      title="Create New Showtime"
      open={open}
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
          <Col span={12} style={{ padding: "0 10px" }}>
            <Form.Item
              label="Select Movie"
              name="movie_id"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select a movie!" }]}
            >
              <Select
                placeholder="Select a movie"
                options={movieOptions}
                onChange={handleMovieChange}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "0 10px" }}>
            <Form.Item
              label="Show Date"
              name="show_date"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please enter a show date!" }]}
            >
              <Input type="date" onChange={(e) => handleDateChange(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "0 10px" }}>
            <Form.Item
              label="Show Time"
              name="show_time"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please enter a show time!" }]}
            >
              <Input type="time" onChange={(e) => handleTimeChange(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "0 10px" }}>
            <Form.Item
              label="Status"
              name="status"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select
                placeholder="Select a status"
                options={statusOptions}
                onChange={handleStatusChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Select Theater Room"
              name="theater_room"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select a theater room!" }]}
            >
              <Select placeholder="Select a theater room" options={cinemaOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Additional Services" name="services" labelCol={{ span: 24 }}>
              <Select mode="multiple" placeholder="Select services" options={statusOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Description" name="description" labelCol={{ span: 24 }}>
              <Input.TextArea rows={4} placeholder="Enter showtime description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalCreateShowtime;
