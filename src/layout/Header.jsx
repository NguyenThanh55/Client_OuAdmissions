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

    let url_chatroom = "/chat";
    let loading = true;
    if (user !== null) {
        url_chatroom = `/chat/${user['username']}`;
        if (user['userRole'] !== "USER") {
            loading = false;
        }
    }

    const search = (evt) => {
        evt.preventDefault();
        nav(`/search?kw=${kw}`);
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    return (
        <>
            <Navbar className="headcolor" variant="dark" >
                <Container style={{ width: "80%" }}>
                    <div>
                        <Image class="img_logo" src="https://ou.edu.vn/wp-content/uploads/2016/08/Logo.png" rounded alt='Logo' />
                    </div>
                    <ul className="nav navbar-nav navbar-right" style={{ padding: 20 }}>
                        <Form onSubmit={search} inline className="d-flex">
                            <Form.Control
                                style={{ height: "80%", margin: "1%" }}
                                className=" mr-sm-2"
                                type="text"
                                value={kw}
                                onChange={e => setKw(e.target.value)}
                                placeholder="Nhập từ khóa..."
                            />
                            <Button style={{ margin: "1%", height: "80%" }} variant="info" className='buttonTim' type='submit'>Tìm kiếm </Button>{' '}
                        </Form>
                    </ul>
                </Container>
            </Navbar>
            <Navbar className='headcolor' variant="dark" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 5 }}>
                <Container style={{ width: "80%" }}>
                    <Nav className="mr-auto mr-auto123">
                        <Link to="/" className='nav-link'>Trang chủ</Link>
                        <NavDropdown title="Thông tin tuyển sinh" id="basic-nav-dropdown">
                            <TypeFeature />
                        </NavDropdown>
                        <Link to="/department" className='nav-link'>Thông tin khoa ngành</Link>
                        <Link to="/questionAndAnswer" className='nav-link'>Q&A</Link>
                        {loading ? <Link to={url_chatroom} className='nav-link'>Tư vấn trực tiếp</Link>
                            : <Link to="/chat/admin" className='nav-link'>Tư vấn trực tiếp</Link>}
                        {user === null ? <></> : <>
                            {user.userRole === 'CONSULTANT' &&
                                <Link to="/questionsForLive" className='nav-link'>Câu hỏi Live</Link>
                            }
                        </>}
                    </Nav>
                    {user === null ? <>
                        <div class="dky_dnhap">
                            <Button><Link to="/register">Đăng ký</Link></Button> {' '}
                            <Button><Link to="/login">Đăng nhập</Link></Button>{' '}
                        </div>
                    </> : <>
                        <Dropdown logout={logout} />
                        <div class="dky_dnhap">
                            <Button><Link to="/" className='text-white'>{user.username}</Link></Button>
                            {/* <Button variant="outline-info" onClick={logout}>Đăng xuất</Button>{' '} */}
                        </div>
                    </>}
                </Container>
            </Navbar >

        </>
    );
}

export default Header;