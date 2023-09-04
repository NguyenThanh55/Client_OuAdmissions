import React, { useEffect, useState, useContext } from "react";
// import AlbumFeature from "../Album";
import './home.scss';
import ListPost1 from "../Post/ListPost1";
import ListPost2 from "../Post/ListPost2";
import ListPost3 from "../Post/ListPost3";
import ListPost4 from "../Post/ListPost4";
import ListPost5 from "../Post/ListPost5";
import { useSearchParams } from "react-router-dom";
import axiosClient, { endpoints } from "../../api/axiosClient";
import Banner from "../Banner/Banner";
import { MyUserContext } from '../../App';
import NotificationLive from "../LiveStream/NotificationLive";




const Home = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const [posts, setPosts] = useState(null);
  const [q] = useSearchParams();
  // console.log(user['avatar']);
  useEffect(() => {
    let loadPosts = async () => {
      try {
        let e = endpoints['post'];
        let typeId = q.get("typeId");
        if (typeId !== null)
          e = `${e}?typeId=${typeId}`;

        let res = await axiosClient.get(e);
        setPosts(res.data);
      } catch (ex) {
        console.error(ex);
      }
    }

    loadPosts();

  }, [q])

  return (
    <>
      <div>
        <h1 className="text-center text-sky-500 mt-7 info">THÔNG TIN TUYỂN SINH</h1>
        <div className="home">
          <div style={{ width: "70%" }}>
            <h2 className="title" id="1" >Hệ chính quy</h2>
            <ListPost1 />
            <h2 className="title" id="2" >Hệ liên thông</h2>
            <ListPost2 />
            <h2 className="title" id="3" >Cao học </h2>
            <ListPost3 />
            <h2 className="title" id="4" >Thạc sĩ </h2>
            <ListPost4 />
            <h2 className="title" id="5" >Đào tạo từ xa </h2>
            <ListPost5 />
          </div>

          <div className="livestream" >
            <h2 className="title">Tin tức livestream</h2>
            <NotificationLive />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
