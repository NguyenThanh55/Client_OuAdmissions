import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
// import './Comment.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import CommentForm from '../LiveStream/QuestionForm';

const QuestionItem = (props, { replyId = 0 }) => {
    const [user] = useContext(MyUserContext);

    //kiểm tra question có phải của người đăng nhập không
    const canReply = Boolean(user)
    // const canEdit = user.id === props.q.userId.id;
    // const canDelete = user.id === props.q.userId.id;

    const [activeQuestion, setActiveQuestion] = useState('');
    let [contentReply, setContentReplyState] = useState('');
    const [contentEdit, setContentEdit] = useState('');

    const isReplying = activeQuestion
        && activeQuestion.type === 'replying'
        && activeQuestion.id === props.q.id;
    const isEditing = activeQuestion
        && activeQuestion.type === 'editing'
        && activeQuestion.id === props.q.id;
    // const reply = replyId ? replyId : props.q.id;
    const commentsRef = useRef([]);
    const [ques, setQues] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadQues = async () => {
            let res = await axiosClient.get(endpoints['questionInfo'](props.q.id));
            setQues(res.data);
            setIsLoading(false);
        }
        loadQues();
    }, []);

    const submitReplyQuestion = async (event) => {
        event.preventDefault();
        // console.log(props.cmt.userId.username);
        try {
            let res = await axiosClient.post(endpoints['addQuestion'], {
                "content": contentReply,
                "liveId": 0,
                "userId": user,
                "answer": props.q.id
            })
            // console.log(res);
            props.setListQuestion([...props.listQuestion, res.data]);
            setActiveQuestion(null);
            setContentEdit(props.q.content);
            commentsRef.current = props.listQuestion;
        } catch (ex) {
            console.error(ex);
            setIsLoading(false);
        }
        // setListQuestion([...listQuestion, cmt])
        setContentReplyState("");

    };

    const updateQuestion = (e, questionId) => {
        e.preventDefault();
        const process = async () => {
            // console.log(">>>>>>>> bắt đầu");
            const data = await axiosClient.post(endpoints['updateQuestion'](questionId), {
                "id": questionId,
                "content": contentEdit,
            });
            console.log(data);
            props.setListQuestion(listQuestion => {
                const updatedListQuestion = listQuestion.map(q => {
                    if (q.id === questionId) {
                        return { ...q, content: contentEdit };
                    }
                    return q;
                });
                return updatedListQuestion;
            });
            console.log(props.listQuestion);
        };
        process();
        setActiveQuestion(null);
    }

    const deleteQuestion = (cmtId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            axiosClient.delete(endpoints['deleteQuestion'](cmtId))
                .then(() => {
                    props.setListQuestion(props.listQuestion.filter((comment) => comment.id !== cmtId));
                });
        }
    }

    if (props.listQuesReplies === null)
        return (<div>Chua co binh luan nao</div>)

    // console.log(props.cmt.id);

    return (
        <>
            {isLoading ?
                <div>Loading ...</div>
                :
                <>
                    <Row className="vh-500 d-flex justify-content-center align-items-center">

                        {/* style={{ borderLeft: '1px solid black' }} */}
                        <ul key={ques.id} className='form-comment' >
                            <li>
                                <Row>
                                    <Col>
                                        <Image src={ques.userId.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <div key={ques.userId.id}>@{ques.userId.username}</div>
                                {!isEditing &&
                                    <>
                                        <div>{ques.content}</div>
                                        <div>
                                            {canReply && <Link
                                                className='btn_Comment'
                                                variant="primary"
                                                type='button'
                                                onClick={() => setActiveQuestion({ id: ques.id, type: "replying" })}
                                            >
                                                Trả lời
                                            </Link>}
                                            {user.id === ques.userId.id && <Link
                                                className='btn_Comment'
                                                variant="primary"
                                                type='button'
                                                // onClick={() => props.setActiveQuestion({ id: props.cmt.id, type: "editing" })}
                                                onClick={() => {
                                                    setActiveQuestion({ id: ques.id, type: "editing" })
                                                }}
                                            >
                                                Chỉnh sửa
                                            </Link>}
                                            {user.id === ques.userId.id && <Link
                                                id='button-delete-comment'
                                                className='btn_Comment '
                                                variant="primary"
                                                type='button'
                                                onClick={() => deleteQuestion(props.q.id)}
                                            >
                                                Xóa
                                            </Link>}
                                            {isReplying && (
                                                <Form onSubmit={submitReplyQuestion}>
                                                    <>
                                                        <ul className='form-comment'>
                                                            <li>
                                                                <Row>
                                                                    <Col>
                                                                        <Image src={user.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                                                    </Col>
                                                                    {/* <Image style={{ width: "100%" }} src={user.avatar} roundedCircle alt='Logo' /> */}
                                                                </Row>
                                                            </li>
                                                            <li>
                                                                <InputGroup>
                                                                    @{user.username}
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        aria-label="With textarea"
                                                                        value={contentReply}
                                                                        onChange={e => setContentReplyState(e.target.value)}
                                                                        placeholder='Nhập bình luận ...'>
                                                                        {ques.userId.username}
                                                                    </Form.Control>
                                                                </InputGroup>
                                                            </li>
                                                            <li>
                                                                <Button
                                                                    variant="primary"
                                                                    type="submit">
                                                                    Bình luận
                                                                </Button>
                                                                <Button
                                                                    variant="primary"
                                                                    type="button"
                                                                    onClick={() => setActiveQuestion(null)}
                                                                >
                                                                    Hủy
                                                                </Button>

                                                            </li>
                                                        </ul>
                                                    </>
                                                </Form >
                                            )}
                                            <>
                                                {props.listQuesReplies.map(quesReply => (
                                                    <QuestionItem
                                                        key={quesReply.id}
                                                        cmt={quesReply}
                                                        getReplies={props.getReplies}
                                                        listQuesReplies={props.getReplies(quesReply.id)}
                                                        updateQuestion={updateQuestion}
                                                        setListQuestion={props.setListQuestion}
                                                        deleteQuestion={deleteQuestion}
                                                        listQuestion={props.listQuestion}
                                                        reply={ques.id}
                                                    />
                                                ))}
                                            </>
                                        </div>
                                    </>}
                                {isEditing &&
                                    <Form onSubmit={(e) => updateQuestion(e, ques.id)} >
                                        <ul className='form-comment'>
                                            <li>
                                                <Row>
                                                    <Col>
                                                        <Image src={user.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                                    </Col>
                                                </Row>
                                            </li>
                                            <li>
                                                <InputGroup>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        value={contentEdit}
                                                        onChange={e => setContentEdit(e.target.value)}
                                                        placeholder='Nhập bình luận ... ' />
                                                </InputGroup>
                                            </li>
                                            <li>
                                                <Button
                                                    variant="primary"
                                                    type="submit">
                                                    Cập nhật
                                                </Button>
                                                {/* {handleCancelButton && ( */}
                                                <Button
                                                    variant="primary"
                                                    type='button'
                                                    // className='comment-form-button comment-form-cancel-button'
                                                    onClick={() => setActiveQuestion(null)} >
                                                    Hủy
                                                </Button>
                                                {/* )} */}
                                            </li>
                                        </ul>
                                    </Form>
                                }
                            </li>
                        </ul >
                    </Row>
                </>}
        </>
    );
};

export default QuestionItem;