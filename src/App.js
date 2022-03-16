import "./App.css";
// import React, { useEffect } from "react";
// import Board from "react-trello";
// import { db } from "./Firebase";
// import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import SidebarLib from "./Components/SidebarLib";
// import ReactSearchBox from "react-search-box";
import Login from "./Components/Login";
import Kanban from "./Components/Kanban";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Kanban" element={<Kanban />} />
          {/* <Login /> */}
          {/* <SidebarLib /> */}
          {/* <Kanban /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
