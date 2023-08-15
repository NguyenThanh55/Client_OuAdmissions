import React, { useEffect, useState } from 'react';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';

function PostItem({ postId }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        axiosClient.get(`${endpoints['postInfo']} / ${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostItem;