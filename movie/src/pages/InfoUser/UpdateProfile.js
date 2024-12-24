import { Col, Divider, Row, Form, Input, Button, message } from "antd";
import "./profile.scss";
import avatarImg from "../../assets/avatarLogo.jpg";
import { useEffect, useState } from "react";
import { callAllMovies, callGetAllCustomer, callGetUserById, callUpdateInfoUser } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction, doUpdateInfoAction } from "../../redux/account/accountSlice";

const UpdateInfo = () => {
  const [form] = Form.useForm();
  const [previewImg, setPreviewImg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [infoUser, setInfoUser] = useState({});
  const [initValue, setInitValue] = useState({});

  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const userId = user?.user?.user_id;
  console.log(user)
  useEffect(() => {
    fetchInfoUser();
  }, []);

  // Get user information
  const fetchInfoUser = async () => {
    const res = await callGetUserById(userId);

    if (res.user_id) {
      const formValues = {
        display_name: res.user_name,
        email: res.email,
        phone_number: res.phone,
        detail_address: res.address,
        avatar: res.avatar,
      };
      setInitValue(formValues);
      setPreviewImg(res.avatar);
      form.setFieldsValue(formValues);
    }
  };

  // Update user information
  const onFinish = async (values) => {
    const { display_name, detail_address, phone_number } = values;
    
    const formData = new FormData();
    
    formData.append('user_name', display_name);
    formData.append('phone', phone_number);
    formData.append('address', detail_address);
    
    if (avatar) {
      formData.append('avatar', avatar);
    }
  
    // Debug formData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    const res = await callUpdateInfoUser(
      formData,
      user?.user?.user_id
    );
  
    if (res && res.status === 200) {
      message.success("Your information has been updated successfully.");
      dispatch(doLoginAction(res));
      console.log('state sau khi update')
      console.log(user)
      await fetchInfoUser();
    }
  };
  
  // Update API call function


  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        message.error('File size must be less than 5MB');
        return;
      }
      if (!file.type.includes('image/')) {
        message.error('File must be an image');
        return; 
      }
      setAvatar(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };
  // console.log(avatar)
  // console.log(user.user.user_id)
  return (
    <>
      <div className="info-page-container">
        <div className="page-wrapper">
          <div className="info-header">
            <h2>Personal Information</h2>
            <span style={{ fontSize: "13px" }}>Manage your personal information</span>
          </div>
          <Divider />
          <div className="form-update-info">
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[]}>
                <Col span={16}>
                  <Row gutter={[20]}>
                    <Col span={12}>
                      <Form.Item
                        name={"display_name"}
                        label="Username"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input name!" },
                        ]}
                      >
                        <Input style={{ height: "30px" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={"email"}
                        label="Email"
                        labelCol={{ span: 24 }}
                      >
                        <Input disabled={true} style={{ height: "30px" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={"phone_number"}
                        label="Phone Number"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input phone!" },
                        ]}
                      >
                        <Input style={{ height: "30px" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={"detail_address"}
                        label="Address"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input address!" },
                        ]}
                      >
                        <Input style={{ height: "30px" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => form.submit()}
                      >
                        Update Information
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>
                    <div className="media-avatar-profile">
                      <img src={previewImg || avatarImg} alt="#avatar" />
                    </div>
                    <div className="input-avatar">
                      <label htmlFor="avatar">
                        <span className="btn-change-avatar">Change Avatar</span>
                        <input
                          type="file"
                          id="avatar"
                          style={{ display: "none" }}
                          onChange={(e) => handleChangeAvatar(e)}
                        />
                      </label>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateInfo;
