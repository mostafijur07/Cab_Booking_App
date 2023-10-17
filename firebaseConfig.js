import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "cab-book-900e7.firebaseapp.com",
    projectId: "",
    storageBucket: "cab-book-900e7.appspot.com",
    messagingSenderId: "307488247882",
    appId: ""
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
