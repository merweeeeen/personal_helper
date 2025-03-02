// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import dotenv from "dotenv";
dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "personalhelper-d6306.firebaseapp.com",
  projectId: "personalhelper-d6306",
  storageBucket: "personalhelper-d6306.firebasestorage.app",
  messagingSenderId: "983043960617",
  appId: "1:983043960617:web:6d657b8a42eb4eec02d138",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
