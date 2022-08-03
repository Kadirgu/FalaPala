
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDNHECUKbWKGL0shCgBK-HN7ry6At3o504",
    authDomain: "falapala-chatapp.firebaseapp.com",
    projectId: "falapala-chatapp",
    storageBucket: "falapala-chatapp.appspot.com",
    messagingSenderId: "45406076426",
    appId: "1:45406076426:web:395609f08d1894e95ae9f3",
    measurementId: "G-CLDRKZPVNR"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service (db)
export const db = getFirestore(app);