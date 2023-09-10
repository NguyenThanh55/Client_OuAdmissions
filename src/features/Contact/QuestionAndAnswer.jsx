import React, { useContext, useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import { MyUserContext } from '../../App';
import QuestionForm from './QuestionForm';
import Answer from './Answer';

const QuestionAndAnswer = () => {
    const [listQuestion, setListQuestion] = useState([]);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState('');
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [q] = useSearchParams();
    const [ques, setQues] = useState(null);
    const [showForm, setShowForm] = useState(false);
    let [contentReply, setContentReplyState] = useState('');

    useEffect(() => {
        let loadQuestions = async () => {
            try {
                let e = endpoints['listQuestions'];
                let page = q.get('page');
                if (page !== null)
                    e = `${e}?page=${page}`;
                let response = await axiosClient.get(e);
                setListQuestion(response.data.questions);
                // console.log(response.data.questions);
                setPages(response.data.pages);
            } catch (error) {
                console.error(error);
            }

        }

        loadQuestions();

    }, [q, currentPage]);

    useEffect(() => {
        console.log(expandedQuestion);
        if (expandedQuestion) {
            getAnswer(expandedQuestion); // Kiểm tra giá trị trong useEffect
            if (answer !== null)
                console.log(">>>>>Answer: " + answer.id + answer.content);
        }
    }, [expandedQuestion]);


    // useEffect(() => {
    //     setStart((page - 1) * PAGE_SIZE)
    // }, [page]);

    const handleQuestionClick = (questionId) => {
        if (expandedQuestion === questionId) {
            setExpandedQuestion(null);
            setAnswer(null);
        } else {
            setExpandedQuestion(questionId);
        }

    };

    // const submitAnswer = (id) => {
    //     if (ques === id) {
    //         setQues(null);
    //     }
    //     else {
    //         setQues(id);
    //         setShowForm(true);
    //     }
    // }

    // //Lọc ds lấy những câu hỏi 
    const getListAllQuestions = listQuestion.filter(q => q.style === true);

    // //Lấy câu trả lời của từng câu hỏi
    const getAnswer = (queId) => {
        const filteredQuestions = listQuestion.filter(q => (q.answer === queId));
        if (filteredQuestions.length > 0) {
            setAnswer(filteredQuestions[0]);
        }
    }

    const submitReplyQuestion = async (event, id) => {
        event.preventDefault();
        // console.log(props.cmt.userId.username);
        try {
            let res = await axiosClient.post(endpoints['addQuestion'], {
                "content": contentReply,
                "liveId": 0,
                "userId": user,
                "answer": id,
                "style": false
            })
            setListQuestion([...listQuestion, res.data]);
        } catch (ex) {
            console.error(ex);
        }
        setContentReplyState("");
        setShowForm(false);
    };

    //Click trả lời của người tư vấn
    const submitAnswer = (q) => {
        setShowForm(true);
        setQues(q);
    }


    //Click chọn trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        nav(`/questionAndAnswer?page=${page}`)
    }

    return (
        <div className='question-and-answer'>
            {/* Hiện câu hỏi thường hỏi */}
            <section className='container-question wow animate__animated animate__fadeInUp'>
                <div className='section-ques'>
                    <h2>Các câu hỏi thường gặp</h2>
                    <div className='ques-items'>
                        {getListAllQuestions.map((q) => (
                            <div className='ques-item' key={q.id}>
                                <div className={`ques ${expandedQuestion === q.id ? 'expanded' : ''}`} key={q.id}
                                    onClick={() => handleQuestionClick(q.id)}>
                                    {q.content}
                                    <span className='arrow-circle'>
                                        {q.answer !== 1 ?
                                            <i className='fa-solid fa-plus'>0</i>
                                            :
                                            <i className='fa-solid fa-plus'>1</i>
                                        }
                                    </span>
                                </div>
                                {answer &&
                                    <div key={answer.id} className={`ans answer ${expandedQuestion === q.id ? 'expanded' : ''}`}>
                                        {answer.content}
                                    </div>
                                }
                                {user.userRole === 'CONSULTANT' && q.answer !== 1 &&
                                    <Button
                                        key={q.id}
                                        className='btn_Comment'
                                        variant="primary"
                                        type='button'
                                        onClick={(q) => submitAnswer(q)}
                                    >
                                        Trả lời
                                    </Button>
                                }
                                {showForm && <div>
                                    <Answer
                                        setShowForm={setShowForm}
                                        setListQuestion={setListQuestion}
                                        listQuestion={listQuestion}
                                        ques={ques} />
                                </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='ChangePage'>
                        <Pagination
                            count={pages}
                            showFirstButton
                            showLastButton
                            page={currentPage}
                            onChange={(e, page) => handlePageChange(page)} />
                    </div>
                </div>
            </section >

            {/* Form đặt câu hỏi */}
            {user.userRole !== 'CONSULTANT' && <QuestionForm />}
        </div >
    );
};

export default QuestionAndAnswer;