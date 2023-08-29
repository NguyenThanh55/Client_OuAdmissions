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

    const getReplies = cmtId => {
        return listComment.filter(cmt => cmt.reply === cmtId)
    }

    const addComment = (content, reply) => {
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

    const updateComment = (content, commentId, reply) => {

        const process = async () => {
            console.log(">>>>>>>> bắt đầu");
            const data = await axiosClient.put(`${endpoints['updateComment']}${commentId}`, {
                "id": commentId,
                "content": content,
                "postId": postId,
                "userId": user,
                "reply": reply
            });
            // .then(() => {
            //     let updateListComment = listComment.map(cmt => {
            //         if (cmt.id === commentId)
            //             return { ...cmt, content: content };
            //         return cmt;
            //     })
            console.log(data);
            setListCmt(listComment);
            console.log(listComment);
        };

        // setListCmt([...listComment, data]);
        setContentState("");
        setActiveCmt(null);
        console.log(">>>>>>> kết thúc update");

        process();
    };




    const deleteComment = (cmtId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            axiosClient.delete(`${endpoints['deleteComment']} + ${cmtId}`)
                .then(() => {
                    setListCmt(listComment.filter((comment) => comment.id !== cmtId));
                });
        }
    }

    // const submitReplyComment = (commentId, content) => {
    // event.preventDefault();
    // try {
    //     let res = await axiosClient.post(endpoints['addComment'], {
    //         "content": content,
    //         "userId": user.id,
    //         "postId": props.cmt.postId,
    //         "reply": props.cmt.id
    //     })
    //     // console.log(res);
    //     setListCmt([...listComment, res.data]);
    // } catch (ex) {
    //     console.error(ex);
    // }
    // // setListCmt([...listComment, cmt])
    // setContentState("")
    // };

    if (listComment === null)
        return (<div>Chưa có bình luận</div>)

    return (
        <>
            <div>Id: {postId}</div>
            <Row className="vh-500 d-flex justify-content-center align-items-center">
                <CommentForm submitLabel="Bình luận" handleSubmit={addComment} reply={reply} />
                <div>--------Danh sách bình luận------------</div>
                {listComment.map(cmt => (
                    <CommentItem
                        key={cmt.id}
                        cmt={cmt}
                        listCmtReplies={getReplies(cmt.id)}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        setListCmt={setListCmt}
                        listComment={listComment}
                        activeComment={activeComment}
                        setActiveCmt={setActiveCmt}
                        reply={reply}
                    />
                ))}
            </Row >
        </>
    );
};
export default Comment;