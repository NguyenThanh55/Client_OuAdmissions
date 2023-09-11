import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Banner from '../Banner/Banner';
import { Card } from 'react-bootstrap';

const Search = () => {
    const [posts, setPosts] = useState(null);
    const [q] = useSearchParams();

    useEffect(() => {
        let loadPosts = async () => {
            try {
                let e = endpoints['posts'];
                let kw = q.get('kw');
                if (kw !== null)
                    e = `${e}?kw=${kw}`;
                let res = await axiosClient.get(e);
                setPosts(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadPosts();
    }, [q])

    if (posts === null)
        return (<>Không có dữ liệu</>)


    return (
        <>
            <Banner />
            <ul className='ListPostTS' >
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

export default Search;