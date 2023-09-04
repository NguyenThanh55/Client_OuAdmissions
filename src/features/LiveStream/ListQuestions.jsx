import React from 'react';
import { ListGroup } from 'react-bootstrap';
import QuestionItem from './QuestionItem';
import axiosClient, { endpoints } from '../../api/axiosClient';

const ListQuestions = (props) => {

    const getReplies = liveId => {
        return props.listQuestion.filter(q => q.answer === liveId)
    }

    const deleteQuestion = (liveId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
            axiosClient.delete(endpoints['deleteQuestion'](liveId))
                .then(() => {
                    props.setListQuestion(props.listQuestion.filter((question) => question.id !== liveId));
                });
        }
    }


    return (
        <>
            <ListGroup>
                {props.questions.map(q =>
                    <QuestionItem
                        key={q.id}
                        question={q}
                        getReplies={getReplies}
                        listCmtReplies={getReplies(q.id)}
                        deleteQuestion={deleteQuestion}
                        // updateComment={updateComment}
                        setListQuestion={props.setListQuestion}
                        listQuestion={props.listQuestion}
                        activeQuestion={props.activeQuestion}
                        setActiveQuestion={props.setActiveQuestion} />
                )}
            </ListGroup>
        </>
    );
};

export default ListQuestions;