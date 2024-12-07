// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
 
        apiKey: "AIzaSyCWd4Kq2DUpRLOldu6MZEizJXuIdU-H4Z4",
        authDomain: "amu-vacancy.firebaseapp.com",
        projectId: "amu-vacancy",
        storageBucket: "amu-vacancy.firebasestorage.app",
        messagingSenderId: "145612291453",
        appId: "1:145612291453:web:3ba5275292b59d8a3b6014",
        measurementId: "G-X774JYPMDV"

    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };