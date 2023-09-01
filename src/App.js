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
import { createContext, useReducer } from "react";
import cookie from "react-cookies";
import MyUserReducer from "./features/Register_Login/reducers/MyUserReducer";
import Search from "./features/Search/Search";
import ChatRoom from "./features/Chat/ChatRoom.jsx";
import AllChatBox from "./features/Chat/AllChatBox.jsx"
import NewChatBox from "./features/Chat/NewChatBox.jsx";
import PostByType from "./features/Post/PostByType";
import Container from 'react-bootstrap/Container';


export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  document.title = "OUAdmissons";

  return (
    <>
      <MyUserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <div>
            <Header />
            <Container>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/khoa" element={<Department />} />
              <Route path="/post_by_Type/:id" element={<PostByType />} />
              <Route path="/post_info/:id" element={<PostItem />} />
              <Route path="/depart_info/:id" element={<DepartItem />} />\
              <Route
                path="/questionAndAnswer"
                element={<QuestionAndAnswer />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat/admin" element={<AllChatBox />} />
              <Route path="/chat/admin/:username" element={<NewChatBox />} />
              <Route path="/chat/:username" element={<ChatRoom />} />
              <Route path="/chat" element={<ChatRoom />} />
            </Routes>
            </Container>
            
            <Footer />
          </div>
        </BrowserRouter>
      </MyUserContext.Provider>
    </>
  );
};

export default App;
