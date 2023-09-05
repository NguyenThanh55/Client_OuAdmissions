import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from "react";
import axiosClient, { endpoints } from "../../api/axiosClient";

const Banner = () => {
    const [banner, setBanner] = useState([])
    useEffect(() => {
        const getBanner = async () => {
            try {
                const res = await axiosClient.get(endpoints['banner']);
                setBanner(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getBanner();
    })
    return (
        <>
            <Carousel>
                {banner.map(banner => (
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner.url}
                        alt="one slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default Banner;