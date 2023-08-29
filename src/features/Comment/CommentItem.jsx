import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import './Comment.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const CommentItem = (props) => {
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
    // const reply = props.reply ? props.reply : props.cmt.id;
    let [contentReply, setContentReplyState] = useState('');
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
                "reply": props.cmt.id
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

    if (props.listCmtReplies === null)
        return (<div>Chua co binh luan nao</div>)

    // console.log(props.cmt.id);

    return (
        <>
            <Row className="vh-500 d-flex justify-content-center align-items-center">
                <Form onSubmit={submitReplyComment}>
                    {/* style={{ borderLeft: '1px solid black' }} */}
                    <ul className='form-comment' >
                        <li>
                            <Row>
                                <Image style={{ width: "100%" }} src={props.cmt.userId.avatar} roundedCircle alt='Logo' />
                            </Row>
                        </li>
                        <li>
                            <div key={props.cmt.userId.id}>@{props.cmt.userId.username}</div>
                            {!isEditing &&
                                <>
                                    <div key={props.cmt.id}>{props.cmt.content}</div>
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
                                            onClick={() => props.setActiveCmt({ id: props.cmt.id, type: "editing" })}
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
                                        )}
                                        <>
                                            {props.listCmtReplies.map(cmtReply => (
                                                <CommentItem
                                                    key={cmtReply.id}
                                                    cmt={cmtReply}
                                                    listCmtReplies={[]}
                                                    updateComment={props.updateComment}
                                                    setListCmt={props.setListCmt}
                                                    deleteComment={props.deleteComment}
                                                    listComment={props.listComment}
                                                    activeComment={props.activeComment}
                                                    setActiveCmt={props.setActiveCmt}
                                                    reply={props.reply}
                                                />
                                            ))}
                                        </>
                                    </div>
                                </>}
                            {isEditing && <CommentForm
                                submitLabel="Cập nhật"
                                handleCancelButton
                                initialText={props.cmt.content}
                                commentId={props.cmt.id}
                                reply={props.cmt.reply}
                                handleSubmit={props.updateComment}
                                // (props.cmt.content,
                                // props.cmt.id,
                                // props.cmt.reply)}
                                handleCancel={() => props.setActiveCmt(null)}
                            />}
                        </li>
                    </ul >
                </Form >
            </Row>
        </>
    );
};

export default CommentItem;