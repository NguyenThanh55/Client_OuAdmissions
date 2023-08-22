import React from "react";
// import AlbumFeature from "../Album";
import './home.scss';
import ListPost1 from "../Post/postList1";
import ListPost2 from "../Post/postList2";
import ListPost3 from "../Post/postList3";
import ListPost4 from "../Post/postList4";
import ListPost5 from "../Post/postList5";
const Home = () => {
  return (
    <>
      {/* <h2>Thông tin tuyển sinh</h2> */}
      <h1 class="text-center text-info mt-1">THÔNG TIN TUYỂN SINH</h1>
      <h2 id="1" >Hệ chính quy</h2>
      <ListPost1 />
      <h2 id="2" >Hệ liên thông</h2>
      <ListPost2 />
      <h2 id="3" >Cao học </h2>
      <ListPost3 />
      <h2 id="4" >Thạc sĩ </h2>
      <ListPost4 />
      <h2 id="5" >Đào tạo từ xa </h2>
      <ListPost5 />
    </>
  );
};

export default Home;
