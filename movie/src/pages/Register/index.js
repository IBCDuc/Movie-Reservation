import { Button, Divider, Form, Input, InputNumber, message, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './register.scss';
import { callAddCustomer, callAllMovies, callLRegisterUser } from '../../services/api';
import ModalVerify from './ModalVerify';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [emailVerify, setEmailVerify] = useState("");

    const onFinish = async (values) => {
        const { email, password, display_name, phone_number, detail_address } = values;
        setEmailVerify(email);

        if (phone_number.length < 10) {
            message.error("The phone number must have at least 10 digits!");
            return;
        }

        setIsSubmitting(true);
        // const res = await callLRegisterUser(email, password, display_name, detail_address);
        const res = await callAddCustomer(email, password, display_name, phone_number, detail_address);
        setIsSubmitting(false);

        if (res?.user) {
            message.success('Account registration successful!');
            setOpenVerify(true);
            navigate('/login');
        } else {
            notification.error({
                message: "An error occurred",
                description: 'An error occurred during registration. Please check your registration details.',
                duration: 3
            });
        }
        // console.log('Check response =>', res);
    };

    return (
        <div className="register-page" style={{ backgroundColor: '#469afa' }}>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Register an Account</h2>
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
                                label="Full Name"
                                name="display_name"
                                rules={[{ required: true, message: 'Full name is required!' }]}
                            >
                                <Input style={{ height: '30px' }} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email is required!' }]}
                            >
                                <Input style={{ height: '30px' }} />
                            </Form.Item >

                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Password is required!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Phone Number"
                                name="phone_number"
                                rules={[{ required: true, message: 'Phone number is required!' }]}
                            >
                                <Input maxLength={10} style={{ height: '30px' }} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} // Full column width
                                label="Address"
                                name="detail_address"
                                rules={[{ required: true, message: 'Address is required!' }]}
                            >
                                <Input style={{ height: '30px' }} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Register
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Already have an account?
                                <span>
                                    <Link to='/login'> Login </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
            <ModalVerify
                open={openVerify}
                setOpen={setOpenVerify}
                emailVerify={emailVerify}
            />
        </div>
    );
};

export default RegisterPage;
