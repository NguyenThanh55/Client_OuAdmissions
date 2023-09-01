import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';

const ListPost5 = () => {
    const [ListPost, setPostState1] = useState([])
    const typeOfPost = 5;

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axiosClient.get(endpoints['post5']);
                // 'https://jsonplaceholder.typicode.com/posts?_limit=4'
                // 'http://localhost:8088/OUAdmission/api/listPostwithCountTS'
                //     'http://localhost:8088/OUAdmissions/api/listPostwithCountTS'
                // )
                // console.log(res.data)
                setPostState1(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getPost();
    })

    return (
        <ul className='ListPostTS' >
            {/* <PostItem postItem={ListPostTS} /> */}
            {ListPost.map(post => (
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
            <li>
                <Card className='card_post'>
                    <Card.Body>
                        <Card.Title><Link className='deco_post' to={`/post_by_Type/${typeOfPost}`}>Xem thêm</Link></Card.Title>
                    </Card.Body>
                </Card>
            </li>
        </ul>
    );
}

export default ListPost5;