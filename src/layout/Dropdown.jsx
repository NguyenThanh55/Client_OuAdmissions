import React from 'react';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import logo from '../logo1.png';
import { useContext } from 'react';
import { MyUserContext } from '../App';
import { Link } from 'react-router-dom';
import './Header.scss';

const Dropdown = (props) => {
    const [user] = useContext(MyUserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDropdownOpen === false)
            setIsDropdownOpen(true);
        else
            setIsDropdownOpen(false);
    }

    return (
        <div className="Dropdown" style={{
            // backgroundColor: "#fff",
            // border: "1px solid #ccc",
            padding: "10px"
        }}>
            <Row >
                <Col>
                    <Image
                        onClick={(e) => handleSubmit(e)}
                        src={user.avatar}
                        roundedCircle
                        style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 10, display: "block" }} />
                </Col>
            </Row>
            {isDropdownOpen && <>
                <div style={{ listStyle: "none", margin: "0", padding: "0", }}
                    className='dropdown-menu show'>
                    <div
                        style={{
                            padding: "5px",
                            cursor: "pointer",
                        }}
                        className='dropdown-item'>
                        <Link to="/" className='dropdown-item-child' style={{ textDecoration: 'none', color: '#1d559f' }}>Trang cá nhân</Link>
                    </div>
                    <div
                        style={{
                            padding: "5px",
                            cursor: "pointer",
                        }}
                        className='dropdown-item'>
                        <Link to="/changePassword" className='dropdown-item-child' style={{ textDecoration: 'none', color: '#1d559f' }}>Đổi mật khẩu</Link>
                    </div>
                    <div
                        style={{
                            padding: "5px",
                            cursor: "pointer",
                        }}
                        className='dropdown-item'>
                        <Link className='dropdown-item-child' style={{ textDecoration: 'none', color: '#1d559f' }} onClick={() => props.logout()} to="/">Đăng xuất</Link>
                    </div>
                </div>
            </>}
        </div >
    );
};

export default Dropdown;