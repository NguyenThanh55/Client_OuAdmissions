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

    // const updateComment = (commentId) => {

    //     const process = async () => {
    //         console.log(">>>>>>>> bắt đầu");
    //         const data = await axiosClient.post(`${endpoints['updateComment']}${commentId}`, {
    //             "id": commentId,
    //             "content": content,
    //         });
    //         // .then(() => {
    //         //     let updateListComment = listComment.map(cmt => {
    //         //         if (cmt.id === commentId)
    //         //             return { ...cmt, content: content };
    //         //         return cmt;
    //         //     })
    //         console.log(data);
    //         setListCmt(listComment => {
    //             const updatedListComment = listComment.map(cmt => {
    //                 if (cmt.id === commentId) {
    //                     return { ...cmt, content: content };
    //                 }
    //                 return cmt;
    //             });
    //             return updatedListComment;
    //         });
    //         console.log(listComment);
    //     };

    // setListCmt([...listComment, data]);
    //     setContentState("");
    //     setActiveCmt(null);
    //     console.log(">>>>>>> kết thúc update");
    //     process();
    // };

    const deleteComment = (cmtId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            axiosClient.delete(`${endpoints['deleteComment']} + ${cmtId}`)
                .then(() => {
                    setListCmt(listComment.filter((comment) => comment.id !== cmtId));
                });
        }
    }

    // const submitReplyComment = (commentId, content) => {
    //     event.preventDefault();
    //     try {
    //         let res = await axiosClient.post(endpoints['addComment'], {
    //             "content": content,
    //             "userId": user.id,
    //             "postId": props.cmt.postId,
    //             "reply": props.cmt.id
    //         })
    //         // console.log(res);
    //         setListCmt([...listComment, res.data]);
    //     } catch (ex) {
    //         console.error(ex);
    //     }
    //     // setListCmt([...listComment, cmt])
    //     setContentState("")
    // };

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
                                <Image style={{ width: "100%" }} src={user.avatar} roundedCircle alt='Logo' />
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