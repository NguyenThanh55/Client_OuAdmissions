import { Container, Form } from "react-bootstrap";
import Message from "./Message"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "../../firebase"
import { MyUserContext } from '../../App';
import { useContext } from 'react';


const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [user, dispatch] = useContext(MyUserContext);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const massages = []; 
            snapshot.forEach((doc) => {
                massages.push({...doc.data(), id: doc.id});
            });
            setMessages(massages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <Container>
        <div className="mt-4">
           {messages.map(message => (
            <Message key={message.id} message={message} />
           ))}
        </div>
        </Container>
    );
}

export default ChatBox;