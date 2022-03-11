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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// const lanes = {
//   lanes: [
//     {
//       id: "PLANNED",
//       title: "Planned Tasks",
//       label: "20/70",
//       style: {
//         width: 280,
//       },
//       cards: [
//         {
//           id: "1",
//           title: "Buy milk",
//           label: "15 mins",
//           cardStyle: {
//             width: 2700,
//             maxWidth: 2700,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "2 Gallons of milk at the Deli store",
//         },
//         {
//           id: "2",
//           title: "Dispose Garbage",
//           label: "10 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Sort out recyclable and waste as needed",
//         },
//         {
//           id: "3",
//           title: "Write Blog",
//           label: "30 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Can AI make memes?",
//         },
//         {
//           id: "4",
//           title: "Pay Rent",
//           label: "5 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Transfer to bank account",
//         },
//       ],
//     },
//     {
//       id: "WIP",
//       title: "Work In Progress",
//       label: "10/20",
//       style: {
//         width: 280,
//       },
//       cards: [
//         {
//           id: "Wip1",
//           title: "Clean House",
//           label: "30 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description:
//             "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
//         },
//         {
//           id: "Wip2",
//           title: "Clean dsf",
//           label: "30 sdfsdf mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "lorem ispum asdfasje sdf. lorem ipsum jashdfls",
//         },
//       ],
//     },
//     {
//       id: "BLOCKED",
//       title: "Blocked",
//       label: "0/0",
//       style: {
//         width: 280,
//       },
//       cards: [],
//     },
//     {
//       id: "COMPLETED",
//       title: "Completed",
//       style: {
//         width: 280,
//       },
//       label: "2/5",
//       cards: [
//         {
//           id: "Completed1",
//           title: "Practice Meditation",
//           label: "15 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Use Headspace app",
//         },
//         {
//           id: "Completed2",
//           title: "Maintain Daily Journal",
//           label: "15 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Use Spreadsheet for now",
//         },
//       ],
//     },
//     {
//       id: "REPEAT",
//       title: "Repeat",
//       style: {
//         width: 280,
//       },
//       label: "1/1",
//       cards: [
//         {
//           id: "Repeat1",
//           title: "Morning Jog",
//           label: "30 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Track using fitbit",
//         },
//       ],
//     },
//     {
//       id: "ARCHIVED",
//       title: "Archived",
//       style: {
//         width: 280,
//       },
//       label: "1/1",
//       cards: [
//         {
//           id: "Archived1",
//           title: "Go Trekking",
//           label: "300 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Completed 10km on cycle",
//         },
//       ],
//     },
//     {
//       id: "ARCHIVED2",
//       title: "Archived2",
//       style: {
//         width: 280,
//       },
//       label: "1/1",
//       cards: [
//         {
//           id: "Archived1",
//           title: "Go Trekking",
//           label: "300 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Completed 10km on cycle",
//         },
//       ],
//     },
//     {
//       id: "ARCHIVED3",
//       title: "Archived3",
//       style: {
//         width: 280,
//       },
//       label: "1/1",
//       cards: [
//         {
//           id: "Archived1",
//           title: "Go Trekking",
//           label: "300 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "Completed 10km on cycle",
//         },
//       ],
//     },
//     {
//       id: "ARCHIVED4",
//       title: "Archived4",
//       style: {
//         width: 280,
//       },
//       label: "1/1",
//       cards: [
//         {
//           id: "sdf4",
//           title: "Go dfg",
//           label: "40 mins",
//           cardStyle: {
//             width: 270,
//             maxWidth: 270,
//             margin: "auto",
//             marginBottom: 5,
//           },
//           description: "dsfg 10km fgh cycle",
//         },
//       ],
//     },
//   ],
// };

// menu.forEach(function (obj) {
//   db.collection("menu")
//     .add({
//       id: obj.id,
//       title: obj.title,
//       label: obj.label,
//       cardStyle: obj.cardStyle,
//       description: obj.description,
//     })
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
// });
