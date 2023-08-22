import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';

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
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostItem;