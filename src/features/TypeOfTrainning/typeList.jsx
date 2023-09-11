import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Link } from 'react-router-dom';

const TypeFeature = () => {
    const [typeList, setTypeState] = useState([]);

    useEffect(() => {
        const getType = async () => {
            try {
                const res = await axiosClient.get(endpoints['type']);
                setTypeState(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getType();
    },[])

    return (
        <>
            {/* <TypeList typeList={typeList} /> */}
            {typeList.map(type => {

                // <NavDropdown.Item href={`#${type.id}`} key={type.id}>{type.name}</NavDropdown.Item >
                let h = `/post_by_Type/${type.id}`;
                // let h = `/${type.id}`;
                // return <a href={`/#${type.id}`} className="dropdown-item" key={type.id}>{type.name}</a>
                return <Link to={h} className="dropdown-item" key={type.id}>{type.name}</Link>
            })}
        </>
    );
}

export default TypeFeature;