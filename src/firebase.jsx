// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCRG7y9JBhbDw3Erh2eQ6lOaYzgFBAh2XA",
  authDomain: "to-do-212ad.firebaseapp.com",
  projectId: "to-do-212ad",
  storageBucket: "to-do-212ad.appspot.com",
  messagingSenderId: "606849720337",
  appId: "1:606849720337:web:1fea866d82c374fd9711b0",
  measurementId: "G-TW80JGHL4Y"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);