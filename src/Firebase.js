import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIwlhG9VxRULANHh5Yo1X9tphbJSgkKVQ",
  authDomain: "react-firebase-crud-app-61a54.firebaseapp.com",
  databaseURL:
    "https://react-firebase-crud-app-61a54-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-firebase-crud-app-61a54",
  storageBucket: "react-firebase-crud-app-61a54.appspot.com",
  messagingSenderId: "843604681561",
  appId: "1:843604681561:web:5f2606bc26883418e16248",
  measurementId: "G-SS3F34VEW4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
