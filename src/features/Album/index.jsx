import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Hệ chính quy',
            thumbnailUrl: 'https://tuyensinh.ou.edu.vn/media/photos/media/logo/logo-w1.png'
        },
        {
            id: 2,
            name: 'Hệ cao học',
            thumbnailUrl: 'https://tuyensinh.ou.edu.vn/media/photos/media/logo/logo-w1.png'
        },
        {
            id: 3,
            name: 'Hệ liên thông',
            thumbnailUrl: 'https://tuyensinh.ou.edu.vn/media/photos/media/logo/logo-w1.png'
        },
        {
            id: 4,
            name: 'Hệ ',
            thumbnailUrl: 'https://tuyensinh.ou.edu.vn/media/photos/media/logo/logo-w1.png'
        },
    ]
    return (
        <div>
            <h1>ZingMP3</h1>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;