import React from 'react';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import logo from '../logo1.png';
import { useContext } from 'react';
import { MyUserContext } from '../App';

const Dropdown = (props) => {
    const [user] = useContext(MyUserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="dropdown">
            {/* <img
                src="path_to_avatar_image"
                alt="Avatar"
                id="avatar"
                onClick={toggleDropdown}
            /> */}
            <Row style={{ width: "15%" }}>
                <Col xs={6} style={{ width: "70%" }}>
                    <Image id="avatar" style={{ width: "100%" }} src={user.avatar} rounded alt='Logo' onclick={() => toggleDropdown()} />
                </Col>
            </Row>
            {isDropdownOpen && (
                <div id="dropdownContent">
                    <a href="#">Lựa chọn 1</a>
                    <a href="#">Lựa chọn 2</a>
                    <a href="#">Lựa chọn 3</a>
                </div>
            )}
        </div>
    );
};

export default Dropdown;