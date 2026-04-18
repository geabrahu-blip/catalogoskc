import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt6sKXrnU8d3tzClUIFBLLzETYM-lFYc4",
  authDomain: "bodega-skc.firebaseapp.com",
  projectId: "bodega-skc",
  storageBucket: "bodega-skc.firebasestorage.app",
  messagingSenderId: "522402556850",
  appId: "1:522402556850:web:2b30a40e23f0482211d2ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
