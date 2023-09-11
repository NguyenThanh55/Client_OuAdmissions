import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Container from 'react-bootstrap/Container';
import { Col, Form, Image, InputGroup } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import { MyUserContext } from '../../App';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { FacebookProvider, Comments, Like } from 'react-facebook';

function PostItem({ postId }) {
    const [user] = useContext(MyUserContext);
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(endpoints['postInfo'](id))
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);



    if (!post) {
        return <div>Loading...{postId}</div>;
    }

    let url = "http://192.168.1.4:3000/post_info/" + id;
    let appId = 6836544049690538;


    // if (!user) {
    //     return navigator()
    // }

    return (
        <Container>
            <div >
                <h2 className="text-center m-5">{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>


            {user !== null ?
                <Comment post_id={post.id} />
                : <>
                    <div style={{ fontSize: 50 }}>
                        Bình luận
                    </div>
                    <div>Vui lòng <Link to={`/login?next=/post_info/${id}`}>Đăng nhập</Link> để bình luận
                    </div>
                </>
            }

            <FacebookProvider appId={appId} width="100%">
                <Comments href="https://hoangvbm2808.github.io/webschool/" width="100%" />
            </FacebookProvider>

            <div className="m-5">
                <FacebookShareButton url={url} appId={appId}>
                    <FacebookIcon size={50} round />
                </FacebookShareButton>
            </div>
        </Container>
    );
}

export default PostItem;