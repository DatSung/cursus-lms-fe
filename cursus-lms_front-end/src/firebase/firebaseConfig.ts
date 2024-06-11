// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1z3bNPJIbvIPpIRrQOFxCKEUx5hc3o6I",
  authDomain: "cursus-lms-storage.firebaseapp.com",
  projectId: "cursus-lms-storage",
  storageBucket: "cursus-lms-storage.appspot.com",
  messagingSenderId: "319358669808",
  appId: "1:319358669808:web:f150d1880d7734a36a8335",
  measurementId: "G-7LBHZKPY5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
