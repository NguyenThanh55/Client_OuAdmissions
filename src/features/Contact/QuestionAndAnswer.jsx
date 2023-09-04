import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
const PAGE_SIZE = 25;

const QuestionAndAnswer = () => {
    const [listAllQuestions, setListAllQuestions] = useState([]);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [page, setPage] = useState(1);
    const [start, setStart] = useState('');

    useEffect(() => {
        let loadQuestions = async () => {
            let response = await axiosClient.get(endpoints['listQuestions']);
            setListAllQuestions(response.data);
        }
        loadQuestions();
    }, []);

    useEffect(() => {
        setStart((page - 1) * PAGE_SIZE)
    }, [page]);

    const handleQuestionClick = (questionId) => {
        if (expandedQuestion === questionId) {
            setExpandedQuestion(null);
            setAnswer(null);
        } else {
            setExpandedQuestion(questionId);
        }
    };

    useEffect(() => {
        console.log(expandedQuestion);
        if (expandedQuestion) {
            getAnswer(expandedQuestion); // Kiểm tra giá trị trong useEffect
            if (answer !== null)
                console.log(">>>>>Answer: " + answer.id + answer.content);
        }
    }, [expandedQuestion]);

    const getListAllQuestions = listAllQuestions.filter(q => q.answer === 0);
    const getAnswer = (queId) => {
        const filteredQuestions = listAllQuestions.filter(q => q.answer === queId);
        if (filteredQuestions.length > 0) {
            setAnswer(filteredQuestions[0]);
            // console.log(filteredQuestions[0]);
        }
    }
    return (
        <div className='question-and-answer'>
            <section className='container-question wow animate__animated animate__fadeInUp'>
                <div className='section-ques'>
                    <h2>Các câu hỏi thường gặp</h2>
                    <div className='ques-items'>
                        {getListAllQuestions.slice(start, start + PAGE_SIZE).map((q) => (
                            <div className='ques-item' key={q.id}>
                                <div className={`ques ${expandedQuestion === q.id ? 'expanded' : ''}`} key={q.id}
                                    onClick={() => handleQuestionClick(q.id)}>
                                    {q.content}
                                    <span className='arrow-circle'>
                                        <i className='fa-solid fa-plus' />
                                    </span>
                                </div>
                                {answer &&
                                    <div key={answer.id} className={`ans answer ${expandedQuestion === q.id ? 'expanded' : ''}`}>
                                        {answer.content}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='ChangePage'>
                        <Pagination
                            count={Math.ceil(getListAllQuestions.length / PAGE_SIZE)}
                            showFirstButton
                            showLastButton
                            onChange={(e, p) => setPage(p)} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuestionAndAnswer;