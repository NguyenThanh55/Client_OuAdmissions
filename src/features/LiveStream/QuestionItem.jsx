import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';

const QuestionItem = (props, { replyId = 0 }) => {
    const [user] = useContext(MyUserContext);
    const canReply = Boolean(user)
    const canEdit = user.id === props.question.userId.id;
    const canDelete = user.id === props.question.userId.id;
    const isReplying = props.activeQuestion
        && props.activeQuestion.type === 'replying'
        && props.activeQuestion.id === props.question.id;
    const isEditing = props.activeQuestion
        && props.activeQuestion.type === 'editing'
        && props.activeQuestion.id === props.question.id;
    const reply = replyId ? replyId : props.question.id;
    let [contentReply, setContentReplyState] = useState('');
    const [contentEdit, setContentEdit] = useState(props.question.content);

    const submitReplyQuestion = async (event) => {
        event.preventDefault();
        // console.log(props.question.userId.username);
        try {
            let { data } = await axiosClient.post(endpoints['addQuestion'], {
                "content": contentReply,
                "livestreamId": props.question.livestreamId,
                "userId": user,
                "answer": reply
            })
            // console.log(data);
            props.setListQuestion([...props.listQuestion, data]);
            props.setActiveQuestion(null);
            // commentsRef.current = props.listComment;
        } catch (ex) {
            console.error(ex);
        }
        // setListQuestion([...props.listQuestion, question])
        setContentReplyState("");

    };

    const updateQuestion = (e, questionId) => {
        e.preventDefault();
        const process = async () => {
            console.log(">>>>>>>> bắt đầu");
            const data = await axiosClient.post(endpoints['updateQuestion'](questionId), {
                "id": questionId,
                "content": contentEdit,
            });
            console.log(data);
            props.setListQuestion(listQuestion => {
                const updatedListQuestion = props.listQuestion.map(question => {
                    if (question.id === questionId) {
                        return { ...question, content: contentEdit };
                    }
                    return question;
                });
                return updatedListQuestion;
            });
            console.log(props.listQuestion);
        };
        process();
        props.setActiveQuestion(null);
    }

    return (
        <>
            {user !== null ? <>
                {/* {c.user.username} - {c.content} - <Moment locale="vi" fromNow>{c.createdDate}</Moment> */}

                <ul key={props.question.id} className='form-comment' >
                    <li>
                        {/* <div className='home'> */}
                        <Row>
                            <Col>
                                <Image
                                    src={props.question.userId.avatar}
                                    roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                            </Col>
                        </Row>
                    </li>
                    <li>
                        {/* <Card className='question-item' key={props.question.id}> */}
                        <Row>
                            <Col>
                                @{props.question.userId.username}
                            </Col>
                        </Row>
                        {/* </div> */}

                        {!isEditing &&
                            <>
                                <li>
                                    <div key={props.question.userId.id}>{props.question.content}</div>
                                </li>
                                <div>
                                    {canReply && <Link
                                        className='btn_Comment'
                                        variant="primary"
                                        type='button'
                                        onClick={() => props.setActiveQuestion({ id: props.question.id, type: "replying" })}
                                    >
                                        Trả lời
                                    </Link>}
                                    {canEdit && <Link
                                        className='btn_Comment'
                                        variant="primary"
                                        type='button'
                                        // onClick={() => props.setActivequestion({ id: props.question.id, type: "editing" })}
                                        onClick={() => {
                                            props.setActiveQuestion({ id: props.question.id, type: "editing" })
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Link>}
                                    {canDelete && <Link
                                        id='button-delete-comment'
                                        className='btn_Comment '
                                        variant="primary"
                                        type='button'
                                        onClick={() => props.deleteQuestion(props.question.id)}
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
                                                                {props.question.userId.username}
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
                                                            onClick={() => props.setActiveQuestion(null)}
                                                        >
                                                            Hủy
                                                        </Button>

                                                    </li>
                                                </ul>
                                            </>
                                        </Form >
                                    )}
                                    <>
                                        {props.listCmtReplies.map(questionReply => (
                                            <QuestionItem
                                                key={questionReply.id}
                                                question={questionReply}
                                                getReplies={props.getReplies}
                                                listCmtReplies={props.getReplies(questionReply.id)}
                                                updateQuestion={updateQuestion}
                                                setListQuestion={props.setListQuestion}
                                                deleteQuestion={props.deleteQuestion}
                                                listQuestion={props.listQuestion}
                                                activeQuestion={props.activeQuestion}
                                                setActiveQuestion={props.setActiveQuestion}
                                                reply={props.question.id}
                                            />
                                        ))}
                                    </>
                                </div>
                            </>
                        }
                        {isEditing &&
                            <Form onSubmit={(e) => updateQuestion(e, props.question.id)} >
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
                                            onClick={() => props.setActiveQuestion(null)} >
                                            Hủy
                                        </Button>
                                        {/* )} */}
                                    </li>
                                </ul>
                            </Form>
                        }
                        {/* </li> */}
                    </li>
                </ul >
            </>
                :
                <>
                    <div>Vui lòng <Link to={`/login?next=/live_info/${props.question.id}`}>Đăng nhập</Link> để xem câu hỏi</div>
                </>}
        </>
    );
};

export default QuestionItem;