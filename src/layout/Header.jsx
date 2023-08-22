import React, { Component } from 'react';
// import './Header.scss';
import logo from '../logo.png';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TypeFeature from '../features/TypeOfTrainning/typeList';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
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
                            <form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="text"
                                    name="kw"
                                    placeholder="Nhập từ khóa..."
                                />
                                <Button variant="outline-info"> Tìm </Button>{' '}
                            </form>
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
                        <Nav.Link to="#pricing">Liên hệ</Nav.Link>
                    </Nav>
                    <Button variant="outline-info">  Đăng ký</Button>{' '}
                    <Button variant="outline-info">  Đăng nhập</Button>{' '}

                </Navbar>


                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png"
                            alt="one slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-dkxt2-01.png"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-Ket qua so tuyen-1-01.png"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                {/* </nav> */}
            </>
        )
    }
}

export default Header;
