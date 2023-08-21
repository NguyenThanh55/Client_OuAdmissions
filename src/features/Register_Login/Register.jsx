import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Tên</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Nhập tên ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng tên!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Họ</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
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
                                                        placeholder="Nhập địa chỉ email ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng email!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Số điện thoại</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        placeholder="Nhập số điện thoại ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng số điện thoại!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Tên đăng nhập</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
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
                                                        placeholder="Password" />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng mật khẩu!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
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