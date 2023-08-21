import React, { Component, useEffect, useState } from 'react';
import './Header.scss';
import logo from '../logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TypeFeature from '../features/TypeOfTrainning/typeList';
import { Button, Col, Form, FormControl, Image, Row } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient, { endpoints } from '../api/axiosClient';
const Header = () => {
    const [kw, setKw] = useState("");
    const nav = useNavigate();

    const search = (evt) => {
        evt.preventDefault();
        nav(`/?kw=${kw}`);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" >
                <Container style={{ width: "100%" }}>
                    <Row style={{ width: "15%" }}>
                        <Col xs={6} style={{ width: "90%" }}>
                            {/* <Image style={{ width: "100%" }} src='https://tuyensinh.ou.edu.vn/media/photos/media/logo/logo-w1.png' rounded alt='Logo' /> */}
                            <Image style={{ width: "100%" }} src={logo} rounded alt='Logo' />
                        </Col>
                    </Row>
                    <Navbar.Brand href="/" style={{ width: "65%", fontWeight: 'bold' }}>CỔNG THÔNG TIN TUYỂN SINH <br />TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH</Navbar.Brand>
                    <ul
                        className="nav navbar-nav navbar-right" style={{ padding: 10 }}
                    >
                        <Form onSubmit={search} inline className="d-flex">
                            <Form.Control
                                className=" mr-sm-2"
                                type="text"
                                value={kw}
                                onChange={e => setKw(e.target.value)}
                                placeholder="Nhập từ khóa..."
                            />
                            <Button variant="outline-info" type='submit'> Tìm </Button>{' '}
                        </Form>
                    </ul>
                </Container>
            </Navbar>
            <Navbar bg="dark" variant="dark" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 5 }}>

                <Nav className="mr-auto">
                    <Link to="/" className='nav-link'>Trang chủ</Link>
                    <NavDropdown title="Thông tin tuyển sinh" id="basic-nav-dropdown">
                        <TypeFeature />
                    </NavDropdown>
                    <Link to="/khoa" className='nav-link'>Thông tin khoa ngành</Link>
                    <Link to="/questionAndAnswer" className='nav-link'>Q&A</Link>
                </Nav>
                <Button variant="outline-info"><Link to="/register" className='text-white'>Đăng ký</Link></Button>{' '}
                <Button variant="outline-info"><Link to="/login" className='text-white'>Đăng nhập</Link></Button>{' '}

            </Navbar>


        </>
    );
}

export default Header;
