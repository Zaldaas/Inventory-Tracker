// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLIfaixIb8uR25WCtiaYYQ8bMBSU_vzkQ",
  authDomain: "inventory-management-875d4.firebaseapp.com",
  projectId: "inventory-management-875d4",
  storageBucket: "inventory-management-875d4.appspot.com",
  messagingSenderId: "136489995102",
  appId: "1:136489995102:web:a3bd55f75bebb371a6ddcf",
  measurementId: "G-M91MS1C9YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};