import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';
import './Comment.scss';
import axiosClient, { authApi, endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Comment = (props) => {
    const [user] = useContext(MyUserContext);
    const [content, setContentState] = useState();
    const [listComment, setListCmt] = useState([]);
    const [activeComment, setActiveCmt] = useState(null);
    const postId = props.post_id;
    const reply = 0;
    useEffect(() => {
        axiosClient.get(`${endpoints['commentByPost']} + ${postId}`)
            .then(response => {
                setListCmt(response.data);
            })
            .catch(error => {
                console.log('Error fetching post:', error);
            });
    }, [postId])

    const comments = listComment.filter(
        (cmt) => cmt.reply === 0
    );

    const getReplies = cmtId => {
        return listComment.filter(cmt => cmt.reply === cmtId)
    }

    const addComment = (e) => {
        e.preventDefault();
        const process = async () => {
            let { data } = await axiosClient.post(endpoints['addComment'], {
                "content": content,
                "postId": postId,
                "userId": user,
                "reply": reply
            })
            // console.log(data);
            setListCmt([data, ...listComment]);
            setContentState("");
        };
        process();
    }

    const deleteComment = (cmtId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            axiosClient.delete(`${endpoints['deleteComment']} + ${cmtId}`)
                .then(() => {
                    setListCmt(listComment.filter((comment) => comment.id !== cmtId));
                });
        }
    }


    if (listComment === null)
        return (<div>Chưa có bình luận</div>)

    return (
        <>
            <Row className="vh-500 d-flex justify-content-center align-items-center">
                {/* <CommentForm submitLabel="Bình luận" handleSubmit={addComment} /> */}
                <Form onSubmit={addComment}>
                    <ul className='form-comment'>
                        <li>
                            <Row>
                                <Image src={user.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                            </Row>
                        </li>
                        <li>
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    aria-label="With textarea"
                                    value={content}
                                    onChange={e => setContentState(e.target.value)}
                                    placeholder='Nhập bình luận ... ' />
                            </InputGroup>
                        </li>
                        <li>
                            <Button
                                variant="primary"
                                type="submit">
                                Bình luận
                            </Button>
                        </li>
                    </ul>
                </Form>
                {comments.map(cmt => (
                    <CommentItem
                        key={cmt.id}
                        cmt={cmt}
                        getReplies={getReplies}
                        listCmtReplies={getReplies(cmt.id)}
                        deleteComment={deleteComment}
                        // updateComment={updateComment}
                        setListCmt={setListCmt}
                        listComment={listComment}
                        activeComment={activeComment}
                        setActiveCmt={setActiveCmt}
                    />
                ))}
            </Row >
        </>
    );
};
export default Comment;