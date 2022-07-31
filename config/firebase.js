import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Get a reference to Firebase Cloud Storage service
export const storage = getStorage(app);

// Get a reference to the Firebase auth object
export const auth = getAuth();