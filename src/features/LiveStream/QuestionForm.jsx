import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Col, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import './liveStream.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const QuestionForm = (props) => {
    const [content, setContent] = useState('');
    // const [id, setId] = useState('');
    // const [reply, setReply] = useState('');
    const navigate = useNavigate();
    const quesRef = useRef([]);
    const [user] = useContext(MyUserContext);
    const handleAddQuestion = (e) => {
        e.preventDefault();
        const process = async () => {
            try {
                let { data } = await axiosClient.post(endpoints['addQuestion'], {
                    "content": content,
                    "livestreamId": props.id,
                    "userId": user,
                    "answer": 0,
                    "style": true,
                });
                props.setListQuestion([...props.listQuestion], data);
                quesRef.current = props.listQuestion;
                toast.success('Gửi câu hỏi thành công!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                toast.error('Gửi không thành công!', {
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
        };
        process();
        props.setShowForm(false);
        navigate(`/live_info/${props.id}`);
    }

    return (
        <>
            <div className="overlay">
                <div className="form-container">
                    <Form onSubmit={handleAddQuestion} >
                        <Row className="vh-100 d-flex justify-content-center ">
                            <Col md={8} lg={10} xs={12}>
                                <div className="border border-3 border-primary"></div>
                                <Card className="shadow">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase text-center">Đặt câu hỏi</h2>
                                            <div className="mb-3">
                                                <button className="close-button" onClick={() => props.setShowForm(false)}>X</button>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <p className=" textDky">Tên đăng nhập: {user.username}</p>
                                                </Form.Group>
                                                <li className='form-question'>
                                                    <p className=" textDky">Bạn muốn đặt câu hỏi gì</p>
                                                    <InputGroup>
                                                        <Form.Control
                                                            as="textarea"
                                                            aria-label="With textarea"
                                                            value={content}
                                                            onChange={e => setContent(e.target.value)}
                                                            placeholder='Nhập câu hỏi ... ' />
                                                    </InputGroup>
                                                </li>
                                                <li className='form-question form-question-btn'>
                                                    <Button
                                                        variant="primary"
                                                        type="submit">
                                                        Gửi
                                                    </Button>
                                                </li>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default QuestionForm;