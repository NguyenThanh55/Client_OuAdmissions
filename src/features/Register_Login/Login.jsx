import React, { useContext, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import axiosClient, { authApi, endpoints } from '../../api/axiosClient';
import cookie from "react-cookies";
import { MyUserContext } from '../../App';
import './style.scss';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [user, dispatch] = useContext(MyUserContext)
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [q] = useSearchParams();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        const process = async () => {
            try {
                let res = await axiosClient.post(endpoints['login'], {
                    "username": username,
                    "password": password
                });
                cookie.save("token", res.data);
                let { data } = await authApi().get(endpoints['current-user']);
                cookie.save("user", data);

                dispatch({
                    "type": "login",
                    "payload": data
                })
                toast.success('Đăng nhập thành công!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (ex) {
                console.error(ex);
                toast.error('Đăng nhập không thành công!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        process();
    };

    if (user !== null) {
        let next = q.get("next") || "/";
        return <Navigate to={next} />
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center">Đăng nhập</h2>
                                    <div className="mb-3">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <p className=" textDky">Tên đăng nhập</p>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                    placeholder="Nhập tên đăng nhập ..."
                                                />
                                                <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    Vui lòng nhập tên đăng nhập!!!
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <p className=" textDky">Mật khẩu</p>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    placeholder="Nhập mật khẩu ..." />
                                                <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    Vui lòng nhập mật khẩu!!!
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                <p className="small">
                                                    <Link className="text-primary" to="/changePassword">
                                                        Quên mật khẩu?
                                                    </Link>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit">
                                                    Đăng nhập
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Chưa có tài khoản{" "}
                                                <Link to="/register" className="text-primary fw-bold">
                                                    Đăng ký
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default Login;