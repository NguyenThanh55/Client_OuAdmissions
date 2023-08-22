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
            <p>{depart.educationProgram}</p>
            <p>{depart.website}</p>
            <p>{depart.introduceVideo}</p>
            <p>{depart.averageScore}</p>
        </>
    );
}

export default DepartItem;