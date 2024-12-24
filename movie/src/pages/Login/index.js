import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';
import { callAllMovies, callLoginUser } from '../../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email, password } = values;
        // setIsSubmitting(true);
        // const res = await callLoginUser(email, password, "xxx111xxx");
        const res = await callLoginUser(email, password);
        console.log("Login response>>>", res);
        console.log("Response status>>>", res.status);

        if (res.success) {
            // Save token in localStorage
            localStorage.setItem('token', res.token);
            dispatch(doLoginAction(res));
            message.success('Successfully logged in!');
            navigate('/');
        } else if (res?.status !== 200) {
            notification.error({
                message: "An error occurred",
                description: "There was an error logging in, please check your information",
                duration: 3
            });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="login-page" style={{ backgroundColor: '#469afa' }}>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Login</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email is required!' }]}
                                
                            >
                                <Input style={{ height: '30px' }} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Password is required!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Login
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <div className="login-footer">
                                <p className="text text-normal">Don't have an account?
                                    <span>
                                        <Link to='/register'> Register </Link>
                                    </span>
                                </p>
                                <p>
                                    <Link to='/forgot-password'> Forgot Password </Link>
                                </p>
                            </div>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;