import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { async } from 'q';
import { Card, ListGroup } from 'react-bootstrap';
import './liveStream.scss';
import { Link } from 'react-router-dom';

const NotificationLive = () => {
    const [lives, setLive] = useState([]);
    useEffect(() => {
        axiosClient.get(endpoints['liveStreams'])
            .then(res => { setLive(res.data); })
            .catch(err => { console.log(err.message); });
    }, []);

    if (!lives)
        return <div>Chưa có thông báo nào</div>;

    return (
        <>
            <div className='listLiveStreams'>
                <Card>
                    <ListGroup variant="flush">
                        {lives.map(live => (
                            <ListGroup.Item key={live.id}>
                                <Link className='deco_post' to={`/live_info/${live.id}`}>
                                    {live.title}
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </>
    );
};

export default NotificationLive;