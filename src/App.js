// import "./App.css";
// import TypeFeature from "./features/TypeOfTrainning/typeList";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Department from "./features/Department/Department";
import Home from "./features/Home/Home";
import PostItem from "./features/Post/PostItem";
import DepartItem from "./features/Department/DepartItem";
import Login from "./features/Register_Login/Login";
import Footer from "./layout/Footer";
import Register from "./features/Register_Login/Register";
import QuestionAndAnswer from "./features/Q&A/QuestionAndAnswer";
// import ListPost from "./features/Post/postList";
// import AlbumFeature from "./features/Album";

function App() {
  // const [user, dispatch] = useReducer(
  //   MyUserReducer,
  //   cookie.load("user") || null
  // );
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/khoa" element={<Department />} />
            <Route path="/post_info/:id" element={<PostItem />} />
            <Route path="/depart_info/:id" element={<DepartItem />} />\
            <Route path="/questionAndAnswer" element={<QuestionAndAnswer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
