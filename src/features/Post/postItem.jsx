import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Container from 'react-bootstrap/Container';
import { Col, Form, Image, InputGroup } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import { MyUserContext } from '../../App';

function PostItem({ postId }) {
    const [user] = useContext(MyUserContext);
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`${endpoints['postInfo']} + ${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...{postId}</div>;
    }

    // if (!user) {
    //     return navigator()
    // }

    return (
        <Container>
            <div >
                <h2>{post.title}</h2>
                {post.content}
            </div>
            {user !== null ?
                <Comment post_id={post.id} />
                : <>
                    <div style={{ fontSize: 50 }}>
                        Bình luận
                    </div>
                    <div>Để bình luận, bạn cần phải <Link to="/login">Đăng nhập</Link>
                    </div>
                </>
            }
        </Container>
    );
}

export default PostItem;