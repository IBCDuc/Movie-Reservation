import { Col, Divider, Row, Form, Input, Button, message } from "antd";
import "./profile.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { callChangePassUser } from "../../services/api";
import { useNavigate } from "react-router-dom";


const UpdatePass = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const user = useSelector((state) => state.account.user);
  
  const userId = user.id;

  //update info user

  const onFinish = async (values) => {
    const { password, newPassword } = values;
    const res = await callChangePassUser(userId ,password, newPassword)
    if(res && res.status === 200){
       // console.log('res>>>', res);
        message.success("Đổi mật khẩu thành công") 
        navigate('/login')
    }else{
        message.error("Có lỗi xảy ra vui lòng nhập lại pass")
    } 
  };

  return (
    <>
      <div className="info-page-container">
        <div className="page-wrapper">
          <div className="info-header">
            <h2>Đổi mật khẩu</h2>
            <span style={{fontSize:'13px'}}>Vui lòng không chia sẻ mật khẩu để đảm bảo an toàn cho tài khoản</span>
          </div>
          <Divider />
          <div className="form-update-info-pass">
            <Form form={form} onFinish={onFinish}>
                    <Col span={12}>
                      <Form.Item
                        name={"password"}
                        label="Mật khẩu hiện tại"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input current pass!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item
                        name={"newPassword"}
                        label="Mật khẩu mới"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input new pass!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={"confirmPass"}
                        label="Xác nhận mật khẩu mới"
                        labelCol={{ span: 24 }}
                        rules={[
                          { required: true, message: "Please input confirm pass!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => form.submit()}
                      >
                        Xác nhận thay đổi
                      </Button>
                    </Col>   
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePass;
