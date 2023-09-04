import React, { Component, useContext, useEffect, useState } from 'react';
import './Header.scss';
import '../layout/cssall.css';
import logo from '../logo1.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TypeFeature from '../features/TypeOfTrainning/typeList';
import { Button, Col, DropdownButton, Form, FormControl, Image, Row } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient, { endpoints } from '../api/axiosClient';
import { MyUserContext } from '../App';
import Dropdown from './Dropdown';
const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [kw, setKw] = useState("");
    const nav = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const search = (evt) => {
        evt.preventDefault();
        nav(`/search?kw=${kw}`);
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/");
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <Navbar className="headcolor" variant="dark" >
                <Container style={{ width: "80%" }}>
                    <Row style={{ width: "15%" }}>
                        <Col xs={6} style={{ width: "70%" }}>
                            <Image style={{ width: "100%" }} src={logo} rounded alt='Logo' />
                        </Col>
                    </Row>
                    <Navbar.Brand href="/" style={{ width: "65%", fontWeight: 'bold' }}>CỔNG THÔNG TIN TUYỂN SINH <br />TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH</Navbar.Brand>
                    <ul
                        className="nav navbar-nav navbar-right" style={{ padding: 10 }}
                    >
                        <Form onSubmit={search} inline className="d-flex">
                            <Form.Control
                                style={{ height: "80%", margin: "1%" }}
                                className=" mr-sm-2"
                                type="text"
                                value={kw}
                                onChange={e => setKw(e.target.value)}
                                placeholder="Nhập từ khóa..."
                            />
                            <Button style={{ margin: "1%", height: "80%" }} variant="info" className='buttonTim' type='submit'> Tìm </Button>{' '}
                        </Form>
                    </ul>
                </Container>
            </Navbar>
            <Navbar className="headcolor" variant="dark" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 5 }}>
                <Container style={{ width: "80%" }}>
                    <Nav className="mr-auto">
                        <Link to="/" className='nav-link'>Trang chủ</Link>
                        <NavDropdown title="Thông tin tuyển sinh" id="basic-nav-dropdown">
                            <TypeFeature />
                        </NavDropdown>
                        <Link to="/department" className='nav-link'>Thông tin khoa ngành</Link>
                        <Link to="/questionAndAnswer" className='nav-link'>Q&A</Link>
                        <Link to="/chat" className='nav-link'>Tư vấn trực tiếp</Link>
                        <Link to="/contact" className='nav-link'>Liên hệ</Link>
                        <Link to="/changePassword" className='nav-link'>Đổi mật khẩu</Link>
                    </Nav>
                    {user === null ? <>
                        <Link to="/register" className='loginbt'>Đăng ký</Link> {' '}
                        <Button style={{ margin: "1%" }} variant="outline-info"><Link to="/login" className='text-white'>Đăng nhập</Link></Button>{' '}
                    </> : <>
                        <Row >
                            <Col>
                                <Image src={user.avatar}
                                    roundedCircle
                                    onClick={toggleDropdown}
                                    style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 10 }} />
                            </Col>
                        </Row>
                        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton> */}
                        <Link to="/" className='text-white'>{user.username}</Link>
                        <Button variant="outline-info" style={{ margin: "1%" }} onClick={logout}>Đăng xuất</Button>{' '}
                    </>}

                </Container>
            </Navbar >

        </>
    );
}

export default Header;
