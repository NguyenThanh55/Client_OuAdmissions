import { Container, Form } from "react-bootstrap";
import React, { useContext, useState } from 'react';
import { MyUserContext } from '../../App';
import {addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from "../../firebase"


const SendMessage = () => {
    const [message, setMessage] = useState("");
    const [user, dispatch] = useContext(MyUserContext);
    const url_collection = "messages/" + user['username'] + "/chat"
    
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if(message.trim() === "") {
            alert("Vui lòng nhập tin nhắn");
            return;
        }

        try {
            const uid = user['id']
            await addDoc(collection(db, url_collection), {
                text: message,
                name: user['username'],
                avatar: user['avatar'],
                createdAt: serverTimestamp(),
                uid

            })
        } catch(error) {
            console.log(error);
        }
        setMessage("");
    }


    return (
        <Container>
            <div className="w-full">
                <Form onSubmit={handleSendMessage}>
                    <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                        <div class="input-group mb-0">
                            <input type="text" class="form-control" placeholder="Nhập tin nhắn"
                                required value={message} onChange={e => setMessage(e.target.value)}/>
                            <button class="btn btn-primary" type="submit" id="button-send">
                                Gửi
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default SendMessage;