
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBW2R5dIMCHmzBiXw_UojmFfezzyZGyhRg",
    authDomain: "portfolio-montita.firebaseapp.com",
    projectId: "portfolio-montita",
    storageBucket: "portfolio-montita.firebasestorage.app",
    messagingSenderId: "276966435055",
    appId: "1:276966435055:web:b912c09b467744cb1a531a",
    measurementId: "G-PN16S15WM6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}
