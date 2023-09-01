import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import {Card, Alert} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './post.scss';

const PostByType = (typeId) => {

    const [posts, setPostState] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`${endpoints['postByType']} + ${id}`)
            .then(response => {
                setPostState(response.data);
            })
            .catch(error => {
                console.log('Error fetching post:', error);
            });
    }, [typeId]);

    if (posts === null) {
        return <div>Không có dữ liệu</div>;

    }


    return (
        <>
            <ul className='ListPostTS'>
                {posts.map(post => (
                    <li key={post.id}>
                        <Card className='card_post'>
                            <Card.Img variant="top" src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png" />
                            <Card.Body>
                                {/* <Card.Title><a href={() => handleClick()}>{post.title}</a></Card.Title> */}
                                <Card.Title><Link className='deco_post' to={`/post_info/${post.id}`}>{post.title}</Link></Card.Title>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PostByType;