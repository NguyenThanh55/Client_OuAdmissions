import React from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../../App';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axiosClient, { authApi, endpoints } from '../../api/axiosClient';

const ChangePassword = () => {
    const [user] = useContext(MyUserContext);
    const [validated, setValidated] = useState(false);
    // const [username, setUsername] = useState();
    const [password, setPassword] = useState(true);
    const [q] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [changeSuccess, setChangeSuccess] = useState(false);
    // const [pass, setPass] = useState(true);
    const nav = useNavigate();
    const [err, setErr] = useState(null);

    const [taiKhoan, setTaiKhoanState] = useState({
        "password": "",
        "newPassword": "",
        "confirmNewPassword": "",
    })

    const change = (evt, field) => {
        setTaiKhoanState(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    const changePassword = (evt) => {
        const form = evt.currentTarget;
        evt.preventDefault();
        if (form.checkValidity() === false) {
            evt.stopPropagation();
        }

        setValidated(true);

        const process = async () => {
            let formData = new FormData();

            formData.append("username", user.username);
            formData.append("password", taiKhoan.password);
            formData.append("newPassword", taiKhoan.newPassword);
            setLoading(true);
            let res = await authApi().post(endpoints['change-password'], formData);
            if (res.status === 200) {
                nav("/login");
            } else setErr("Hệ thống bị lỗi!");
        }

        if (taiKhoan.newPassword !== taiKhoan.confirmNewPassword) {
            setPassword(false);
        }
        else {
            process();
            setChangeSuccess(true);
            setLoading(false);
            console.log(taiKhoan.password);
            console.log(taiKhoan.newPassword);
        }
    }

    return (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    {user !== null ? <>
                                        <h2 className="fw-bold mb-2 text-uppercase text-center">Đổi mật khẩu</h2>
                                    </> : <>
                                        <h2 className="fw-bold mb-2 text-uppercase text-center">Quên mật khẩu</h2>
                                    </>}
                                    <div className="mb-3">
                                        <Form noValidate validated={validated} onSubmit={changePassword}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <p className=" textDky">Mật khẩu hiện tại</p>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={taiKhoan.password}
                                                    onChange={e => change(e, "password")}
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
                                                <p className=" textDky">Mật khẩu mới</p>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    value={taiKhoan.newPassword}
                                                    onChange={e => change(e, "newPassword")}
                                                    placeholder="Nhập mật khẩu mới ..." />
                                                <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    Vui lòng nhập mật khẩu!!!
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <p className=" textDky">Xác nhận lại mật khẩu</p>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    value={taiKhoan.confirmNewPassword}
                                                    onChange={e => change(e, "confirmNewPassword")}
                                                    placeholder="Nhập lại mật khẩu mới ..." />
                                                <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    Vui lòng nhập mật khẩu!!!
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            {loading === false && <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit">
                                                    Đổi mật khẩu
                                                </Button>
                                            </div>}
                                            {password === false ? <Alert>Mật khẩu không trùng khớp</Alert> : <div></div>}
                                            {changeSuccess === true ? <Alert>Đổi mật khẩu thành công</Alert> : <div></div>}
                                            {err === null ? <div></div> : <Alert>{err}</Alert>}
                                        </Form>

                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChangePassword;