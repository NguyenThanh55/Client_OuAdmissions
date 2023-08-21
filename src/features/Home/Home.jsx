import React, { useEffect, useState } from "react";
// import AlbumFeature from "../Album";
import './home.scss';
import ListPost1 from "../Post/PostList1";
import ListPost2 from "../Post/PostList2";
import ListPost3 from "../Post/PostList3";
import ListPost4 from "../Post/PostList4";
import ListPost5 from "../Post/PostList5";
import { useSearchParams } from "react-router-dom";
import axiosClient, { endpoints } from "../../api/axiosClient";
import Banner from "../Banner/Banner";
const Home = () => {
  const [posts, setPosts] = useState(null);
  const [q] = useSearchParams();
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
      {/* <h2>Thông tin tuyển sinh</h2> */}
      <h1 class="text-center text-info mt-1">THÔNG TIN TUYỂN SINH</h1>
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
    </>
  );
};

export default Home;
