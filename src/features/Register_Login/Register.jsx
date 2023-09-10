import React, { useRef, useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Toast, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient, { endpoints } from '../../api/axiosClient';
import './style.scss';
import MySpinner from '../Register_Login/MySpinner.js'


const Register = () => {
    const [validated, setValidated] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        confirmPassword: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const avatar = useRef();
    const nav = useNavigate();

    const register = (evt) => {
        const form = evt.currentTarget;
        evt.preventDefault();

        const process = async () => {
            let form = new FormData();

            for (let field in user)
                if (field !== "confirmPassword") form.append(field, user[field]);

            form.append("avatar", avatar.current.files[0]);

            let res = await axiosClient.post(endpoints["register-user"], form);
            if (res.status === 200) {
                nav("/login");
            } else {
                setErr("Hệ thống bị lỗi!");
            };
        };

        const checkUsernameExist = async () => {
            setLoading(true);
            let e = `${endpoints['username']}${user.username.trim()}`;
            let res = await axiosClient.get(e);
            console.log(res.data);
            if (res.data === "Username is exist") {
                setErr("Tên đăng nhập đã tồn tại !!!");
                setLoading(false);
            }
            else {
                process();
            }
        };

        if (form.checkValidity() === false) {
            evt.stopPropagation();
        }

        function validatePhone(phone) {
            // Tạo biểu thức chính quy cho số điện thoại Việt Nam
            const vnfRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay không
            return vnfRegex.test(phone);
        }

        setValidated(true);

        if (user.password.trim() !== "" && user.username.trim() !== "" && user.firstName.trim() !== "" && user.lastName.trim() !== ""
            && user.email.trim() !== "" && user.phone.trim() !== "" && user.confirmPassword.trim() && avatar.current.files[0] !== undefined) {
            if (!validatePhone(user.phone.trim())) {
                setErr("Số điện thoại không đúng định dạng!");
            } else {
                if (user.password.trim() === user.confirmPassword.trim()) {
                    if (user.password.trim().length < 6 || user.password.trim().length > 12) {
                        setErr("Mật khẩu tối thiểu 6, tối đa 12 kí tự!");
                    } else {
                        checkUsernameExist();
                    }
                }
                else {
                    setErr("Mật khẩu không khớp!");
                }
            }
        }
        else {
            setErr("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const change = (evt, field) => {
        setUser((current) => {
            return { ...current, [field]: evt.target.value };
        });
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
                                        {err === null ? "" : <Alert variant="danger">{err}</Alert>}
                                        <div className="mb-3">
                                            <Form noValidate validated={validated} onSubmit={register}>
                                                <Form.Group className="mb-3" controlId="LastName">
                                                    <p className=" textDky">Tên</p>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => change(e, "firstName")}
                                                        placeholder="Nhập tên ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng tên!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="firstName">
                                                    <p className=" textDky">Họ</p>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => change(e, "lastName")}
                                                        placeholder="Nhập họ ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng họ!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <p className=" textDky">Email</p>
                                                    <Form.Control
                                                        required
                                                        type="email"
                                                        onChange={(e) => change(e, "email")}
                                                        placeholder="Nhập địa chỉ email ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng email!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="phone">
                                                    <p className=" textDky">Số điện thoại</p>
                                                    <Form.Control
                                                        required
                                                        type="tel"
                                                        onChange={(e) => change(e, "phone")}
                                                        placeholder="Nhập số điện thoại ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng số điện thoại!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="username">
                                                    <p className=" textDky">Tên đăng nhập</p>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => change(e, "username")}
                                                        placeholder="Nhập tên đăng nhập ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng tên đăng nhập!!!
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
                                                        onChange={(e) => change(e, "password")}
                                                        placeholder="Mật khẩu ..." />

                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng nhập mật khẩu!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicConfirmPassword"
                                                >
                                                    <p className=" textDky">Xác nhận mật khẩu</p>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        onChange={(e) => change(e, "confirmPassword")}
                                                        placeholder="Xác nhận mật khẩu ..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng xác nhận mật khẩu!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicAvatar"
                                                >
                                                    <p className=" textDky">Ảnh đại diện</p>
                                                    <Form.Control type='file' ref={avatar} />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                ></Form.Group>
                                                <div className="d-grid">
                                                    {loading === true ? <MySpinner /> : <Button variant="primary" type="submit">
                                                        Tạo tài khoản
                                                    </Button>}
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