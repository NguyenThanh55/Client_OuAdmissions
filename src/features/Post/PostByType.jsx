import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';

const PostByType = (typeId) => {
    const [posts, setPostState] = useState();
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`${endpoints['postByType']} + ${id}`)
            .then(response => {
                setPostState(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [typeId]);

    return (
        <>
            {posts.map(post => {
                <li key={post.id}>
                    <Card className='card_post'>
                        <Card.Img variant="top" src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png" />
                        <Card.Body>
                            {/* <Card.Title><a href={() => handleClick()}>{post.title}</a></Card.Title> */}
                            <Card.Title><Link className='deco_post' to={`/post_info/${post.id}`}>{post.title}</Link></Card.Title>
                        </Card.Body>
                    </Card>
                </li>
            })}
        </>
    );
};

export default PostByType;