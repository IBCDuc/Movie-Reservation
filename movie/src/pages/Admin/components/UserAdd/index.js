import './style.css';
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';

function UserAdd() {
    const [userApi, setUserApi] = useState(0);
        useEffect(() => {
        const handleAsync = async () => {
            if (userApi) {
                try {
                    const respone = await fetch('http://localhost:8000/admin/add-user', {
                        method: 'POST',
                        body: JSON.stringify(userApi),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (err) {
                    console.log('line:28 err' + err);
                }
            }
        };
        handleAsync();
    }, [userApi]);

    return (
        <section className="movie-form">
            <h1>Add User</h1>
            <Formik
                initialValues={{
                    fname: '',
                    lname: '',
                    email: '',
                    password: '',
                    genre: '',
                }}
                onSubmit={async (values) => {
                    const userApi = 'localhost:8000/admin/add-user';
                    setUserApi({ name: values.lname, email: values.email, password: values.password });
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="row-one">
                            <div className="form-row">
                                <label htmlFor="fname">First Name</label>
                                <Field
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="First Name"
                                    value={values.fname}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="lname">Last Name</label>
                                <Field
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="Last Name"
                                    value={values.lname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row-two">
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="genre">Permit</label>
                                <Field as="select" id="genre" name="genre" value={values.genre} onChange={handleChange}>
                                    <option value="">Select...</option>
                                    <option value="User">User</option>
                                    <option value="Admin" disabled>
                                        Admin
                                    </option>
                                </Field>
                            </div>
                        </div>

                        <div className="form-row actions">
                            <button type="submit" className="btn-primary">
                                Save
                            </button>
                            <button type="button" className="btn-secondary">
                                Delete
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default UserAdd;
