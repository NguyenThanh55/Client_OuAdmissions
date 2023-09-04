import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { useParams } from 'react-router';
import { Button, Card, Col, Container, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import './liveStream.scss';
import { useContext } from 'react';
import { MyUserContext } from '../../App';
import QuestionItem from './QuestionItem';
import ListQuestions from './ListQuestions';

const LiveStreamItem = () => {
    const [user] = useContext(MyUserContext);
    const [live, setLive] = useState(null);
    const [contentQuestion, setContentState] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { id } = useParams();
    const [listQuestion, setListQuestion] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
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
    }, [id]);

    if (!live) {
        return <div>Chưa có dữ liệu</div>;
    }

    const addQuestion = (e) => {
        e.preventDefault();
        const process = async () => {
            let { data } = await axiosClient.post(endpoints['addQuestion'], {
                "content": contentQuestion,
                "livestreamId": id,
                "userId": user,
                "answer": reply
            })
            // console.log(data);
            setListQuestion(data, ...listQuestion);
        };
        process();
        setShowForm(false);
    }

    const questions = listQuestion.filter((q) => q.answer === 0);
    // console.log(question);
    // console.log(questions);




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
                                    </Container>
                                    <Container>
                                        <li className='form-question form-question-btn'>
                                            {user !== null ?
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={() => setShowForm(true)}>
                                                    Đặt câu hỏi
                                                </Button>
                                                : <><div>Vui lòng <Link to={`/login?next=/live_info/${id}`} >đăng nhập</Link> để đặt câu hỏi </div></>
                                            }
                                        </li>
                                        {showForm &&
                                            <QuestionForm
                                                setShowForm={setShowForm}
                                                addQuestion={addQuestion}
                                                contentQuestion={contentQuestion}
                                                setContentState={setContentState} />
                                        }
                                    </Container>
                                </div>
                                <hr />
                                {user !== null ?
                                    <ListQuestions
                                        questions={questions}
                                        setListQuestion={setListQuestion}
                                        listQuestion={listQuestion}
                                        activeQuestion={activeQuestion}
                                        setActiveQuestion={setActiveQuestion}
                                    />
                                    :
                                    <>
                                        <div>Vui lòng <Link to={`/login?next=/live_info/${id}`}>Đăng nhập</Link> để xem câu hỏi
                                        </div>
                                    </>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col >
            </Row >

        </>
    );
};

export default LiveStreamItem;