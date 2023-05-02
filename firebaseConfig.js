import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwqHUGyJDt4rsMcXi0U7eueGFkI6ysqS4",
    authDomain: "cab-book-900e7.firebaseapp.com",
    projectId: "cab-book-900e7",
    storageBucket: "cab-book-900e7.appspot.com",
    messagingSenderId: "307488247882",
    appId: "1:307488247882:web:6c66cf9af2ffcd14c216b3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);