import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../../App';
import React, {useEffect, useContext, useState } from 'react';
import AllChatBox from './AllChatBox'
import NewChatBox from './NewChatBox'
import {db} from "../../firebase"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";

const ChatRoom = () => {

    const [user, dispatch] = useContext(MyUserContext);

    const [chatName, setChatName] = useState([]);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "messages"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const massages = []; 
            snapshot.forEach((doc) => {
                massages.push({...doc.data(), id: doc.id});
                if(doc.id === user['username']){
                    setExist(true);
                }
            });
            setChatName(massages);
        });
        return () => unsubscribe;
    }, []);
    


    if(user === null) {
        return <Navigate to="/login" replace={true} />;
    } 
    if(user['userRole'] === "ADMIN"){
        return (
            <div>
                <AllChatBox />
            </div>
        );
    }
    return (
        <div>
            {exist === true?
            <NewChatBox />:
            <div className="mt-3 d-flex align-items-center justify-content-center">
                <MDBBtn>Tạo đoạn hội thoại mới</MDBBtn>
            </div>}
        </div>
    );
}

export default ChatRoom;