import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { toast } from 'react-toastify';

const Register = () => {
    const [validated, setValidated] = useState(false);

    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [phone, setphone] = useState();
    const [email, setemail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confimPassword, setConfimPassword] = useState();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        let regobj = {
            firstName, lastName, phone,
            email, username, password
        };
        const process = async () => {
            console.log(firstName,lastName,username,password,email,phone)
            try {
                let res = await axiosClient.post(endpoints['register-user'], {
                    "firstName":firstName,
                    "lastName":lastName,
                    "username": username,
                    "password": password,
                    "phone":phone,
                    "email":email
                })
                console.log(res);
            } catch (ex) {
                console.error(ex);
            }
        }
        process();
    };



    return (
        <>
            <div>
                <Container style={{ marginTop: 70 }}>
                    <Row className="vh-300 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                            Đăng ký
                                        </h2>
                                        <div className="mb-3">
                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="LastName">
                                                    <Form.Label className="text-center">Tên</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={firstName}
                                                        onChange={e => setfirstName(e.target.value)}
                                                        placeholder="Nhập tên ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng tên!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="firstName">
                                                    <Form.Label className="text-center">Họ</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={lastName}
                                                        onChange={e => setlastName(e.target.value)}
                                                        placeholder="Nhập họ ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng họ!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Email
                                                    </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="email"
                                                        value={email}
                                                        onChange={e => setemail(e.target.value)}
                                                        placeholder="Nhập địa chỉ email ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng email!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="phone">
                                                    <Form.Label className="text-center">Số điện thoại</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        value={phone}
                                                        onChange={e => setphone(e.target.value)}
                                                        placeholder="Nhập số điện thoại ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng số điện thoại!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="username">
                                                    <Form.Label className="text-center">Tên đăng nhập</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        placeholder="Nhập tên đăng nhập ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng tên đăng nhập!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Mật khẩu</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        placeholder="Password" />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng mật khẩu!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicConfirmPassword"
                                                >
                                                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        value={confimPassword}
                                                        onChange={e => setConfimPassword(e.target.value)}
                                                        placeholder="Password" />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng xác nhận mật khẩu!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                ></Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Tạo tài khoản
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Đã có tài khoản??{' '}
                                                    <Link to="/login" className="text-primary fw-bold">
                                                        Đăng nhập
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    );
}

export default Register;