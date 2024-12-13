import {
    Modal,
    Form,
    Input,
    Col,
    Row,
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
  import { callAddShowTimeDate, callGetMovieSearch } from "../../../services/api"; // Thêm gọi API tạo ngày chiếu
  
  const ModalCreateShowtime = (props) => {
    const { open, setOpen, fetchGetRoomTour } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();
  
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movie.movies); // Giả sử movies có sẵn trong Redux store
  
    const [tempData, setTempData] = useState({
      movie_id: null,
      show_date: null,
      show_time: null,
      status: null,
    });


  
    useEffect(() => {
      dispatch(getMovies()); // Gọi action để lấy danh sách phim từ API
    }, [dispatch]);
  
    // Tạo tùy chọn cho danh sách phim
    let movieOptions = movies?.map((item) => {
      return {
        value: item.Movie_id,
        label: item.Movie_name,
      };
    });
    

  
    // Tùy chọn cho trạng thái showtime (công khai hoặc không công khai)
    let statusOptions = [
      { value: "Public", label: "Công khai" },
      { value: "UnPublic", label: "Không công khai" },
    ];
  
    // Hàm khi chọn phim (lưu tạm dữ liệu)
    const handleMovieChange = (value) => {
      setTempData((prevData) => ({ ...prevData, movie_id: value }));
    };
  
    // Hàm khi chọn ngày chiếu (lưu tạm dữ liệu)
    const handleDateChange = (value) => {
      setTempData((prevData) => ({ ...prevData, show_date: value }));
    };
  
    // Hàm khi chọn giờ chiếu (lưu tạm dữ liệu)
    const handleTimeChange = (value) => {
      setTempData((prevData) => ({ ...prevData, show_time: value }));
    };
  
    // Hàm khi chọn trạng thái (lưu tạm dữ liệu)
    const handleStatusChange = (value) => {
      setTempData((prevData) => ({ ...prevData, status: value }));
    };
  
    // Hàm khi submit form
    const onFinish = async (value) => {
      const { movie_id, show_date, show_time, status } = value;
    //   console.log(movie_id)
    //   console.log(show_date)
    //   console.log(show_time)
    //   console.log(status)
      setIsSubmit(true);
      const res = await callAddShowTimeDate(movie_id, show_date, status);
      console.log(res.status)
      if (res) {
        message.success("Tạo ngày chiếu mới thành công");
        form.resetFields();
        setOpen(false);
        await fetchGetRoomTour();
      } else {
        notification.error({
          message: "Có lỗi xảy ra!",
          description: "Không thể tạo mới ngày chiếu.",
          duration: 3,
        });
        setIsSubmit(false);
      }
    };
  
    return (
      <Modal
        title="Tạo mới ngày chiếu"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        okText="Tạo mới"
        cancelText="Hủy"
        confirmLoading={isSubmit}
        width={"50vw"}
        maskClosable={false}
      >
        <Divider />
        <Form
          form={form}
          name="create-showtime"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={tempData}  // Set giá trị ban đầu từ tempData
        >
          <Row gutter={15}>
            {/* Phim */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Chọn Phim"
                name="movie_id"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Vui lòng chọn phim!" }]}
              >
                <Select
                  placeholder="Chọn một phim"
                  optionFilterProp="children"
                  
                  options={movieOptions}
                  onChange={handleMovieChange}  
                />
              </Form.Item>
            </Col>
  
            {/* Ngày chiếu */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Ngày chiếu"
                name="show_date"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Vui lòng nhập ngày chiếu!" }]}
              >
                <Input type="date" onChange={(e) => handleDateChange(e.target.value)} />  
              </Form.Item>
            </Col>
  
            {/* Giờ chiếu */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Giờ chiếu"
                name="show_time"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Vui lòng nhập giờ chiếu!" }]}
              >
                <Input type="time" onChange={(e) => handleTimeChange(e.target.value)} />  
              </Form.Item>
            </Col>
  
            {/* Trạng thái */}
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Trạng thái"
                name="status"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn trạng thái"
                  optionFilterProp="children"
                  options={statusOptions}
                  onChange={handleStatusChange}  
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };
  
  export default ModalCreateShowtime;
  