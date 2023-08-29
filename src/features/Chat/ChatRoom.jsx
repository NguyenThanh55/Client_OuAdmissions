import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../../App';
import React, { useContext } from 'react';
import AllChatBox from './AllChatBox'


const ChatRoom = () => {

    const [user, dispatch] = useContext(MyUserContext);

    if(user === null) {
        return <Navigate to="/login" replace={true} />;
    } 
    console.log(user)
    if(user['userRole'] === "ADMIN"){
        return (
            <div>
                <AllChatBox />
            </div>
        );
    }

    return (
        <div>
            <ChatBox />
            <SendMessage />
        </div>
    );
}

export default ChatRoom;