import React, { useRef, useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Toast, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import './style.scss';
const Register = () => {
    const [validated, setValidated] = useState(false);

    // const [firstName, setfirstName] = useState();
    // const [lastName, setlastName] = useState();
    // const [phone, setphone] = useState();
    // const [email, setemail] = useState();
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
    // const [confimPassword, setConfimPassword] = useState();

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     event.preventDefault();

    //     if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // let regobj = {
    //     firstName, lastName, phone,
    //     email, username, password
    // };
    //     const process = async () => {
    //         console.log(firstName, lastName, username, password, email, phone)
    //         try {
    //             let res = await axiosClient.post(endpoints['register-user'], {
    //                 "firstName": firstName,
    //                 "lastName": lastName,
    //                 "username": username,
    //                 "password": password,
    //                 "phone": phone,
    //                 "email": email
    //                 // method: 'POST',
    //                 // headers: {
    //                 //     'Accept': 'application/json',
    //                 //     'Content-Type': 'application/json'
    //                 // },
    //                 // mode: 'no-cors',
    //                 // body: JSON.stringify(regobj)
    //             })
    //             console.log(res);
    //         } catch (ex) {
    //             console.error(ex);
    //         }
    //     }
    //     process();

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

        if (form.checkValidity() === false) {
            evt.stopPropagation();
        }

        setValidated(true);

        const process = async () => {
            let form = new FormData();

            for (let field in user)
                if (field !== "confirmPassword") form.append(field, user[field]);

            form.append("avatar", avatar.current.files[0]);

            setLoading(true);
            let res = await axiosClient.post(endpoints["register-user"], form);
            if (res.status === 200) {
                nav("/login");
            } else setErr("Hệ thống bị lỗi!");
        };
        console.log(user.password);
        console.log(user.confirmPassword);

        if (user.password === user.confirmPassword) process();
        else {
            setErr("Mật khẩu không khớp!");
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng email!!!
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="phone">
                                                    <p className=" textDky">Số điện thoại</p>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        onChange={(e) => change(e, "phone")}
                                                        placeholder="Nhập số điện thoại ..." />
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng mật khẩu!!!
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
                                                    <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
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