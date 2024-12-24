import { Modal, Form, Divider, Row, Col, Input, message, notification, DatePicker} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAllMovies, callVerifyRegister } from '../../services/api';

const ModalVerify = (props) => {
 
    const {open, setOpen, emailVerify} = props
    const [form] = Form.useForm()
    const[isSubmit, setIsSubmit] = useState(false)
    const[openReset, setOpenReset] = useState(false)
    const[codeOTP, setCodeOTP] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
      let initValue = {
        email: emailVerify
      }
      form.setFieldsValue(initValue)
    }, [emailVerify]);

    const onFinish = async(value) => {
      setIsSubmit(true);
      const {email, code} = value;
     // console.log("code>>>",value);
      setCodeOTP(code);
    //   const res = await callVerifyRegister(email, code)
        const res = await callAllMovies(email, code)
      if(res.status === 200){
        message.success("Xác thực OTP đăng ký thành công!")
        setIsSubmit(false);
        setOpen(false);
        navigate('/login')
      }else{
        notification.error({
          message: "Có lỗi xảy ra",
          description:
          "Có lỗi xảy ra khi đăng nhập, vui lòng kiểm tra lại thông tin",
          duration: 3
      })
        setIsSubmit(false);
      }
    }

    return ( 
        <>
       <Modal
        forceRender
        title="Xác Nhận OPT"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}

        okText="Xác thực"
        cancelText="Hủy"
        confirmLoading={isSubmit}
        width={"25vw"}
        maskClosable={false}
      >
        
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span= {24}>
              <Form.Item
                label="Email"
                name="email"
                hidden = {true}
               labelCol={{ span: 24 }}
               initialValue={emailVerify}
              >
                <Input />
              </Form.Item>
            </Col>

            
            <Col span={24} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Nhập mã OTP"
                name="code"
                labelCol={{ span: 24 }}
              >
                <Input/>
              </Form.Item>
            </Col>

            
          </Row>
        </Form>
      </Modal>

        </>
     );
}
 
export default ModalVerify;