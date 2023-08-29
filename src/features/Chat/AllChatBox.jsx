import { Container } from "react-bootstrap";
import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../../App';
import { Link } from 'react-router-dom';
import React, {useEffect, useContext, useState } from 'react';
import {db, db_admin} from "../../firebase"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";

const AllChatBox = () => {

    const [user, dispatch] = useContext(MyUserContext);
    const [chatboxs, setChatboxs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "messages"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const massages = []; 
            snapshot.forEach((doc) => {
                massages.push({...doc.data(), id: doc.id});
                console.log(massages.id)
            });
            setChatboxs(massages);
        });
        return () => unsubscribe;
    }, []);

    


    return (
        <Container className="mt-3">
            <div className="mb-2">
                {chatboxs.map(c => (
                    <h1 key={c.id}>{c.id}</h1>
                ))}
            </div>
        </Container>
    );
}

export default AllChatBox;