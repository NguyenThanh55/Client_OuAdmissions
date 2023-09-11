import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { useParams } from 'react-router';
import { Button, Card, Col, Container, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import './liveStream.scss';
import { useContext } from 'react';
import { MyUserContext } from '../../App';
import QuestionItem from '../Contact/QuestionItem';
import ListQuestions from './ListQuestions';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

const LiveStreamItem = () => {
    const [user] = useContext(MyUserContext);
    const [live, setLive] = useState(null);
    // const [content, setContent] = useState('');
    // const [contentQuestion, setContentState] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { id } = useParams();
    const [listQuestion, setListQuestion] = useState([]);
    // const [activeQuestion, setActiveQuestion] = useState(null);
    // const [questions, setQuestions] = useState([]);
    // const [answers, setAnswers] = useState([]);
    const reply = 0;


    useEffect(() => {
        const loadLiveInfo = async () => {
            await axiosClient.get(`${endpoints['liveInfo']} + ${id}`)
                .then(res => {
                    setLive(res.data);
                }).catch(err => {
                    console.log(err.message);
                });
        };

        const loadQuestions = async () => {
            let { data } = await axiosClient.get(endpoints['questions'](id));
            setListQuestion(data);
        }

        loadLiveInfo();
        loadQuestions();
        // setQuestions(listQuestion.filter((q) => q.answer === 0));
        // console.log(questions);
        // setShowForm(false);
    }, [id, listQuestion]);

    const questions = listQuestion.filter(
        (q) => q.answer === 0);

    const updateListQuestion = (question) => {
        setListQuestion(question, ...listQuestion);
    }

    const getAnswer = liveId => {
        return listQuestion.filter((q) => q.answer === liveId);
    }

    if (!live) {
        return <div>Chưa có dữ liệu</div>;
    }

    const formattedDate = format(live.date, "dd-MM-yyyy");

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentTime = new Date();
        console.log("Ngay hien tai");
        console.log(currentTime);
        const formattedDateNow = new Date(format(currentTime, "MM-dd-yyyy"));
        console.log(formattedDateNow);

        console.log(">>>>>>>>>>>");
        console.log(format(live.date, "dd-MM-yyyy"));
        const formattedDate = new Date(format(live.date, "MM-dd-yyyy"));
        console.log(formattedDate);

        if (formattedDateNow.getTime() < formattedDate.getTime()) {
            setShowForm(true);
            console.log("được đặt câu hỏi");
        }
        else {
            setShowForm(false); //Không được đặt câu hỏi
            console.log("Không được đặt câu hỏi");
            toast.error('Không được đặt câu hỏi. Đã hết giờ được hỏi!', {
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
    }

    if (listQuestion === null)
        return <div>Chưa có câu hỏi nào</div>

    return (
        <>
            <Row className="vh-300 d-flex justify-content-center mt-3">
                <Col md={8} lg={10} xs={12} >
                    {/* <div className="border border-3 border-primary"></div> */}
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase text-center">THÔNG BÁO LIVESTREAM</h2>
                                <div className="mb-3"></div>
                                <div className='home'>
                                    <Container>
                                        <h2>{live.title}</h2>
                                        <div>{live.content}</div>
                                        <div>Các bạn được đặt câu hỏi cho đến ngày {formattedDate}</div>
                                    </Container>
                                    <Container>
                                        <li className='form-question form-question-btn'>
                                            {user !== null ?
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={(e) => handleSubmit(e)}>
                                                    Đặt câu hỏi
                                                </Button>
                                                : <><div>Vui lòng <Link to={`/login?next=/live_info/${id}`} >đăng nhập</Link> để đặt câu hỏi </div></>
                                            }
                                        </li>
                                        {showForm &&
                                            <QuestionForm
                                                setShowForm={setShowForm}
                                                setListQuestion={setListQuestion}
                                                listQuestion={listQuestion}
                                                handleSubmit={handleSubmit}
                                                // contentQuestion={contentQuestion}
                                                // setContentState={setContentState}
                                                id={id}
                                            />
                                        }
                                    </Container>
                                </div>
                                <hr />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <ToastContainer />
            </Row>
        </>
    );
};

export default LiveStreamItem;