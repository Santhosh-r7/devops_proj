// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdL5L9UZXtoATCOfBlISIYibkNa_G-hD0",
  authDomain: "taxtrack-3aaf0.firebaseapp.com",
  projectId: "taxtrack-3aaf0",
  storageBucket: "taxtrack-3aaf0.appspot.com",
  messagingSenderId: "928479543214",
  appId: "1:928479543214:web:ce5ade09c6ca593bae523f",
  measurementId: "G-PXGQG52LBF"
};

//app is what connects this to firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);