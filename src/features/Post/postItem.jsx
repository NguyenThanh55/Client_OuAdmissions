import React, { useEffect, useState } from 'react';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { useParams } from 'react-router-dom';

function PostItem({ postId }) {
    const [post, setPost] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        axiosClient.get(`${endpoints['postInfo']} + ${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [postId]);

    if (!post) {
        return <div>Chưa có dữ liệu ...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostItem;