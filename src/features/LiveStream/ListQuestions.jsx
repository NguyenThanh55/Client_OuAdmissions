import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import QuestionItem from '../Contact/QuestionItem';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';

const ListQuestions = () => {
    const [listQuestion, setListQuestion] = useState([]);
    const [pages, setPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [q] = useSearchParams();
    const nav = useNavigate();


    useEffect(() => {
        let loadQuestions = async () => {
            try {
                let e = endpoints['listQuestionsForLive'];
                let page = q.get('page');
                if (page !== null)
                    e = `${e}?page=${page}`;
                let response = await axiosClient.get(e);
                setListQuestion(response.data.questions);
                setPages(response.data.pages);
            } catch (error) {
                console.error(error);
            }
        }
        loadQuestions();

    }, [q, currentPage]);

    //Click chọn trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        nav(`/questionsForLive?page=${page}`)
    }

    return (
        <>
            <div className='question-and-answer'>
                {/* Hiện câu hỏi thường hỏi */}
                <section className='container-question wow animate__animated animate__fadeInUp'>
                    <div className='section-ques'>
                        <h2>Các câu hỏi được đặt </h2>
                        <div className='ques-items'>
                            {listQuestion.map((q) => (
                                <div className='ques-item' key={q.id}>
                                    {/* <div className={`ques ${expandedQuestion === q.id ? 'expanded' : ''}`} key={q.id}
                                        onClick={() => handleQuestionClick(q.id)}> */}
                                    {q.content}
                                    <span className='arrow-circle'>
                                        <i className='fa-solid fa-plus'></i>
                                    </span>
                                    {/* </div> */}
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
            </div >
        </>
    );
};

export default ListQuestions;