import { Container, Image } from "react-bootstrap";
import { MyUserContext } from '../../App';
import { Link } from 'react-router-dom';
import MySpinner from '../Register_Login/MySpinner.js'
import React, {useEffect, useContext, useState } from 'react';
import {db} from "../../firebase"
import { collection, query, where, onSnapshot, orderBy, limit, getDocs, getCountFromServer } from "firebase/firestore";
import {
    MDBCol,
    MDBTypography,
  } from "mdb-react-ui-kit";
import { Navigate } from "react-router-dom";


const AllChatBox = () => {

    const [user, dispatch] = useContext(MyUserContext);
    const [chatboxs, setChatboxs] = useState([]);

    useEffect(() => {
        const loadAllChatBox = () => {
            const q = query(collection(db, "messages")); // get All document in collection messages
            const unsubscribe = onSnapshot(q, (snapshot) => {
                    let messages = [];
                    snapshot.forEach( async (doc1) => { // Loop all document in q 
                        const url_collection = "messages/" + doc1.id + "/chat"; // Get doc.id each document ==> generate url to path chatbox 

                        //Get num document in collection messages on firebase
                        let expenCol = collection(db, "messages");
                        let snapshotCount = await getCountFromServer(expenCol);
                        let i = snapshotCount.data().count;
                        //Query a lastest message each document
                        const queryChatBox = query(collection(db, url_collection), orderBy("createdAt", "desc"), limit(1));//6 9
                        
                        //Get doc in query
                        const querySnapshot = onSnapshot(queryChatBox, (snapshot) => {
                            let count = 0 
                            snapshot.forEach((doc) => {
                                if(messages.length < i) {
                                    // Push if not exist
                                    messages.push({...doc.data(), id: doc1.id});
                                    console.log(messages);
                                    console.log(doc.data().uid);
                                } 
                                else {
                                    //Check if exist 
                                    messages.map(c => {
                                        if(c.uid === doc.data().uid) {
                                            //Delete if exist
                                            delete messages[count]
                                            const results = messages.filter(element => {
                                                if (Object.keys(element).length !== 0) {
                                                  return true;
                                                }
                                                return false;
                                            });
                                            messages = results;
                                        }
                                    count++;
                                })
                                // Push if not exist
                                messages.push({...doc.data(), id: doc1.id});
                                console.log(messages);
                                console.log(doc.data().uid);
                                }
                                
                                
                            });
                            //Check if message length === document on firebase
                            if(messages.length === i){
                                //Sort object by createdAt
                                messages.sort((a, b) => {
                                    return a.createdAt - b.createdAt;
                                  });
                                messages.reverse();
                                //Update state
                                setChatboxs(messages);
                            } 
                        });
                        return () => querySnapshot;  
                    }); 
                })
            return () => unsubscribe;
        }
        loadAllChatBox();
    }, [setChatboxs]);
    
    if(user === null) {
        return <Navigate to="/login" replace={true} />;
    }
    if (chatboxs === null || chatboxs.length === 0){
        return <MySpinner /> ;
    }
    
    return (
        <>
        <Container>
            <div className="mt-4">
            {chatboxs.map(c => {
                let url = `/chat/admin/${c.name}`
                
                return <MDBCol className="mb-4 mb-md-0">
                        <div className="p-3">
                            <MDBTypography listUnStyled className="mb-0">
                                <li className="p-2 border-bottom w-100">
                                <Link 
                                    to={url}
                                    className="d-flex justify-content-between"
                                >
                                    <div className="d-flex flex-row">
                                        <div>
                                            <Image src={c.avatar} roundedCircle style={{width: 50, height: 50, borderRadius: 50/ 2}} />
                                            
                                        </div>
                                        <div className="pt-1 pl-3">
                                            <p className="text-monospace ">
                                            {c.text}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                </li>
                            </MDBTypography>
                        </div>
                    </MDBCol>   
            })}
            </div>
        </Container>
        </> 
    );
}

export default AllChatBox;