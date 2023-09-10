import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './post.scss';
import { Button } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const PAGE_SIZE = 10;

const PostByType = (typeId) => {

    const [posts, setPostState] = useState(null);
    const [pages, setPages] = useState(1);
    const { id } = useParams();
    const [q] = useSearchParams();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    // const [start, setStart] = useState('');

    useEffect(() => {
        let loadPosts = async () => {
            let e = `${endpoints['postByType']}${id}`;
            let page = q.get('page');
            if (page !== null)
                e = `${e}?page=${page}`;
            let response = await axiosClient.get(e);
            setPostState(response.data.posts);
            setPages(response.data.pages);
        }
        loadPosts();
    }, [q, currentPage, id]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        nav(`/post_by_Type/${id}?page=${page}`)
    }

    if (posts === null) {
        return <div>Không có dữ liệu</div>;
    }

    return (
        <>
            <div className='ChangePage'>
                <Pagination
                    count={pages}
                    showFirstButton
                    showLastButton
                    page={currentPage}
                    onChange={(e, page) => handlePageChange(page)} />
            </div>
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