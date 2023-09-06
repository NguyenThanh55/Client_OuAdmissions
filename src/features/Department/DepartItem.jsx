import React, { useEffect, useState } from "react";
import axiosClient, { endpoints } from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { error } from "jquery";
import './depart.scss';

const DepartItem = ({ departId }) => {
    const [depart, setDepart] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`${endpoints['departInfo']} + ${id}`)
            .then(response => {
                setDepart(response.data);
            }).catch(error => {
                console.log('Error fetching depart:', error);
            })
    })

    if (!depart) {
        return <div>Chưa có dữ liệu...</div>;
    }

    return (
        <>
            <h2 className="depart">{depart.name}</h2>
            <p>{depart.description}</p>
            <h3>Chương trình đào tạo:</h3>
            <p3 className="mb-3">{depart.educationProgram}</p3>
            <h2>Website khoa:{depart.website}</h2>
            <p>{depart.introduceVideo}</p>
            <h2>Điểm trung bình trúng tuyển:</h2>
            <div dangerouslySetInnerHTML={{ __html: depart.averageScore}} />
            
        </>
    );
}

export default DepartItem;