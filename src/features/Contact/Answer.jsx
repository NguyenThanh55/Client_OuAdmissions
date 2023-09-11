import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import '../LiveStream/liveStream.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Answer = (
    // setShowForm = setShowForm,
    // // setListQuestion={setListQuestion}
    // // listQuestion={listQuestion}
    // ques = ques
) => {
    const [content, setContent] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [ques, setQues] = useState('');
    let navigate = useNavigate();
    const { id } = useParams();
    const [user] = useContext(MyUserContext);

    useEffect(() => {
        axiosClient.get(endpoints['questionInfo'](id))
            .then(response => {
                setQues(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleAddAnswer = (e) => {
        e.preventDefault();
        const process = async () => {
            try {
                let { data } = await axiosClient.post(endpoints['addQuestion'], {
                    "content": content,
                    "livestreamId": null,
                    "userId": user,
                    "answer": ques.id,
                    "style": false,
                });
                toast.success('Đăng nhập thành công!', {
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
                toast.error('Đăng nhập không thành công!', {
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

            // props.setListQuestion([...props.listQuestion], data);
            // quesRef.current = props.listQuestion;
            // console.log(props.listQuestion);
        };
        process();
        setShowForm(false);
        navigate("/questionAndAnswer");
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowForm(false);
        navigate("/questionAndAnswer");
    }

    return (
        <>
            {showForm && <div className="overlay">
                <div className="form-container">
                    <Form onSubmit={handleAddAnswer} >
                        <Row className="vh-100 d-flex justify-content-center ">
                            <Col md={8} lg={10} xs={12}>
                                <div className="border border-3 border-primary"></div>
                                <Card className="shadow">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase text-center">Trả lời câu hỏi</h2>
                                            <div className="mb-3">
                                                <button className="close-button" onClick={(e) => handleCancel(e)}>X</button>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <p className=" textDky">Tên đăng nhập: {user.username}</p>
                                                </Form.Group>
                                                <li className='form-question'>
                                                    <p className=" textDky">Câu hỏi: {ques.content}</p>
                                                    <InputGroup>
                                                        <Form.Control
                                                            as="textarea"
                                                            aria-label="With textarea"
                                                            value={content}
                                                            onChange={e => setContent(e.target.value)}
                                                            placeholder='Nhập câu trả lời ... ' />
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
            </div >
            }
        </>
    );
};

export default Answer;