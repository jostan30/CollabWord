
import { initializeApp ,getApps ,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlRGJfccJeEJ3AoNblSsPZp6ksh4MbG7w",
  authDomain: "project-348ee.firebaseapp.com",
  projectId: "project-348ee",
  storageBucket: "project-348ee.firebasestorage.app",
  messagingSenderId: "347002221286",
  appId: "1:347002221286:web:7fef9e6352097daafd4127"
};

// Initialize Firebase
const app = getApps().length ===0 ? initializeApp(firebaseConfig): getApp();

const db = getFirestore(app);

export {db};