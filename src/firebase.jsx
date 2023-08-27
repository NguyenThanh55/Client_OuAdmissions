// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDtSfWKc3WYWeZ_65mYm8F9Y_qVjHKPOjo",
  authDomain: "ouadmissions-eb77c.firebaseapp.com",
  projectId: "ouadmissions-eb77c",
  storageBucket: "ouadmissions-eb77c.appspot.com",
  messagingSenderId: "262580743118",
  appId: "1:262580743118:web:8bb223e95419b8121b599f",
  measurementId: "G-61W2B1Z6H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db}


