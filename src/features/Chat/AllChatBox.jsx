import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../../App';
import React, { useContext } from 'react';
import {db} from "../../firebase"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";

const AllChatBox = () => {

    const [user, dispatch] = useContext(MyUserContext);

    


    return (
        <div>
            All chat box
        </div>
    );
}

export default AllChatBox;