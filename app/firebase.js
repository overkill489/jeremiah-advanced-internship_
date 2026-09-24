// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChe2d_e9zCWPH1Lwi6buiTM1Scj6g0ikE",
  authDomain: "advanced-internship-3784b.firebaseapp.com",
  projectId: "advanced-internship-3784b",
  storageBucket: "advanced-internship-3784b.firebasestorage.app",
  messagingSenderId: "1014153825215",
  appId: "1:1014153825215:web:b71b270a09094f9b35ef0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);