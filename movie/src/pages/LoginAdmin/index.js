import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLoginAdminAction } from '../../redux/account/accountSlice';
import { callLoginAdmin, callLoginUser } from '../../services/api';



const LoginForAdmin
 = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {

        const { email, password } = values;
        setIsSubmit(true);
        const res = await callLoginAdmin(email, password);
        console.log("check res",res);
        setIsSubmit(false);

        if (res.success) {
            localStorage.setItem('admin_token', res.token);
            dispatch(doLoginAdminAction(res))
            console.log(res)
            message.success('Đăng nhập tài khoản thành công!');
            navigate('/admin')
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    "Có lỗi xảy ra khi đăng nhập, vui lòng kiểm tra lại thông tin",
                duration: 3
            })
        }
    };


    return (
        <div className="login-page" style={{backgroundColor:'#469afa'}}>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Login Admin/Staff</h2>
                            <Divider />

                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input style={{height: '30px'}} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                          
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginForAdmin
;
