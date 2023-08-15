import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';

const ListPost5 = () => {
    const [ListPost, setPostState1] = useState([])

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
        <ul className='ListPostTS'>
            {/* <PostItem postItem={ListPostTS} /> */}
            {ListPost.map(post => (
                <li key={post.id}>
                    <Card >
                        <Card.Img variant="top" src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png" />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </li>
            ))}
        </ul>
    );
}

export default ListPost5;