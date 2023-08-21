import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Banner from '../Banner/Banner';

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
            <ul>
                {posts.map(post => (
                    <li>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Search;