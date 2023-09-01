import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import './Comment.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const CommentItem = (props, { replyId = 0 }) => {
    const [user] = useContext(MyUserContext);
    const canReply = Boolean(user)
    const canEdit = user.id === props.cmt.userId.id;
    const canDelete = user.id === props.cmt.userId.id;
    const isReplying = props.activeComment
        && props.activeComment.type === 'replying'
        && props.activeComment.id === props.cmt.id;
    const isEditing = props.activeComment
        && props.activeComment.type === 'editing'
        && props.activeComment.id === props.cmt.id;
    const reply = replyId ? replyId : props.cmt.id;
    let [contentReply, setContentReplyState] = useState('');
    const [contentEdit, setContentEdit] = useState(props.cmt.content);
    const commentsRef = useRef([]);
    // console.log(props.cmt);
    // const [listCommentReply, setListCmtReply] = useState([]);

    // useEffect(() => {
    //     axiosClient.get(`${endpoints['commentByReply']} + ${cmt.id}`)
    //         .then(response => {
    //             setListCmtReply(response.data);
    //         })
    //         .catch(error => {
    //             console.log('Error fetching post:', error);
    //         });
    // })

    const submitReplyComment = async (event) => {
        event.preventDefault();
        // console.log(props.cmt.userId.username);
        try {
            let res = await axiosClient.post(endpoints['addComment'], {
                "content": contentReply,
                "userId": user,
                "postId": props.cmt.postId,
                "reply": reply
            })
            // console.log(res);
            props.setListCmt([...props.listComment, res.data]);
            props.setActiveCmt(null);
            commentsRef.current = props.listComment;
        } catch (ex) {
            console.error(ex);
        }
        // setListCmt([...listComment, cmt])
        setContentReplyState("");

    };

    const updateComment = (e, commentId) => {
        e.preventDefault();
        const process = async () => {
            console.log(">>>>>>>> bắt đầu");
            const data = await axiosClient.post(`${endpoints['updateComment']}${commentId}`, {
                "id": commentId,
                "content": contentEdit,
            });
            console.log(data);
            props.setListCmt(listComment => {
                const updatedListComment = listComment.map(cmt => {
                    if (cmt.id === commentId) {
                        return { ...cmt, content: contentEdit };
                    }
                    return cmt;
                });
                return updatedListComment;
            });
            console.log(props.listComment);
        };
        process();
        props.setActiveCmt(null);
    }

    if (props.listCmtReplies === null)
        return (<div>Chua co binh luan nao</div>)

    // console.log(props.cmt.id);

    return (
        <>
            <Row className="vh-500 d-flex justify-content-center align-items-center">

                {/* style={{ borderLeft: '1px solid black' }} */}
                <ul key={props.cmt.id} className='form-comment' >
                    <li>
                        <Row>
                            <Image src={props.cmt.userId.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                            {/* <Image style={{ width: "100%" }} src={props.cmt.userId.avatar} roundedCircle alt='Logo' /> */}
                        </Row>
                    </li>
                    <li>
                        <div key={props.cmt.userId.id}>@{props.cmt.userId.username}</div>
                        {!isEditing &&
                            <>
                                <div>{props.cmt.content}</div>
                                <div>
                                    {canReply && <Link
                                        className='btn_Comment'
                                        variant="primary"
                                        type='button'
                                        onClick={() => props.setActiveCmt({ id: props.cmt.id, type: "replying" })}
                                    >
                                        Trả lời
                                    </Link>}
                                    {canEdit && <Link
                                        className='btn_Comment'
                                        variant="primary"
                                        type='button'
                                        // onClick={() => props.setActiveCmt({ id: props.cmt.id, type: "editing" })}
                                        onClick={() => {
                                            props.setActiveCmt({ id: props.cmt.id, type: "editing" })
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Link>}
                                    {canDelete && <Link
                                        id='button-delete-comment'
                                        className='btn_Comment '
                                        variant="primary"
                                        type='button'
                                        onClick={() => props.deleteComment(props.cmt.id)}
                                    >
                                        Xóa
                                    </Link>}
                                    {isReplying && (
                                        <Form onSubmit={submitReplyComment}>
                                            <>
                                                <ul className='form-comment'>
                                                    <li>
                                                        <Row>
                                                            <Image style={{ width: "100%" }} src={user.avatar} roundedCircle alt='Logo' />
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
                                                                {props.cmt.userId.username}
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
                                                            // style={{ display: 'inline' }}
                                                            // style={{ marginRight: 10 }}
                                                            // inline={value.toString()}
                                                            variant="primary"
                                                            type="button"
                                                            onClick={() => props.setActiveCmt(null)}
                                                        >
                                                            Hủy
                                                        </Button>

                                                    </li>
                                                </ul>
                                            </>
                                        </Form >
                                    )}
                                    <>
                                        {props.listCmtReplies.map(cmtReply => (
                                            <CommentItem
                                                key={cmtReply.id}
                                                cmt={cmtReply}
                                                getReplies={props.getReplies}
                                                listCmtReplies={props.getReplies(cmtReply.id)}
                                                updateComment={props.updateComment}
                                                setListCmt={props.setListCmt}
                                                deleteComment={props.deleteComment}
                                                listComment={props.listComment}
                                                activeComment={props.activeComment}
                                                setActiveCmt={props.setActiveCmt}
                                                reply={props.cmt.id}
                                            />
                                        ))}
                                    </>
                                </div>
                            </>}
                        {isEditing &&
                            // <CommentForm
                            //     submitLabel="Cập nhật"
                            //     handleCancelButton
                            //     initialText={props.cmt.content}
                            //     commentId={props.cmt.id}
                            //     // reply={props.cmt.reply}
                            //     handleSubmit={(content) => props.updateComment(content, props.cmt.id)}
                            //     handleCancel={() => props.setActiveCmt(null)}
                            // />
                            <Form onSubmit={(e) => updateComment(e, props.cmt.id)} >
                                <ul className='form-comment'>
                                    <li>
                                        <Row>
                                            <Image style={{ width: "100%" }} src={user.avatar} roundedCircle alt='Logo' />
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
                                            onClick={() => props.setActiveCmt(null)} >
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
        </>
    );
};

export default CommentItem;