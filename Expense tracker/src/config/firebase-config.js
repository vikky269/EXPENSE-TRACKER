// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuQTyX6bv91h5VywUioNlwlhIJi6LO6ig",
  authDomain: "expense-tracker-9b9c7.firebaseapp.com",
  projectId: "expense-tracker-9b9c7",
  storageBucket: "expense-tracker-9b9c7.appspot.com",
  messagingSenderId: "642577828954",
  appId: "1:642577828954:web:6fe71a6d88d852e2dddc63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider =  new GoogleAuthProvider()
export const db = getFirestore(app)