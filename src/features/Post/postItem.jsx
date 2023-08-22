import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Container from 'react-bootstrap/Container';

function PostItem({ postId }) {
    const [post, setPost] = useState(null);
    const {id} = useParams();

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

    return (
        <Container>
            <div > 
                <h2>{post.title}</h2>
                {post.content}
            </div>
        </Container>
            
        
    );
}

export default PostItem;