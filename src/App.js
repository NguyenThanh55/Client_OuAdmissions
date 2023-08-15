// import "./App.css";
// import TypeFeature from "./features/TypeOfTrainning/typeList";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Department from "./features/Department/Department";
import Home from "./features/Home/Home";
import PostItem from "./features/Post/postItem";
// import ListPost from "./features/Post/postList";
// import AlbumFeature from "./features/Album";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/khoa" element={<Department />} />
            <Route path="/post_info/:id" element={<PostItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
