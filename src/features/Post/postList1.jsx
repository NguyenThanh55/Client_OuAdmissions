import React, { useEffect, useState, } from 'react';
import Card from 'react-bootstrap/Card';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import PostItem from './postItem';
import { Link } from 'react-router-dom';

const ListPost1 = () => {
    const [ListPost, setPostState1] = useState([])
    // const history = useHistory();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axiosClient.get(endpoints['post1']);
                setPostState1(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getPost();
    })

    // const handleClick = (id) => {
    //     history.push('/post_info/${id}');
    // };

    return (
        <ul className='ListPostTS'>
            {/* <PostItem postItem={ListPostTS} /> */}
            {ListPost.map(post => (
                // <PostItem postId={post.id} />
                // <li key={post.id}>
                //     <Card >
                //         <Card.Img variant="top" src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png" />
                //         <Card.Body>
                //             {/* <Card.Title><a href={() => handleClick()}>{post.title}</a></Card.Title> */}
                //             <Card.Title><a>{post.title}</a></Card.Title>
                //         </Card.Body>
                //     </Card>
                // </li>

                <li key={post.id}>
                    <Card >
                        <Card.Img variant="top" src="https://tuyensinh.ou.edu.vn/tmp/rscache/1110x475-21072023-01.png" />
                        <Card.Body>
                            {/* <Card.Title><a href={() => handleClick()}>{post.title}</a></Card.Title> */}
                            <Card.Title><Link to={`/post_info/${post.id}`}>{post.title}</Link></Card.Title>
                        </Card.Body>
                    </Card>

                </li>
            ))}
        </ul>
    );
}

export default ListPost1;