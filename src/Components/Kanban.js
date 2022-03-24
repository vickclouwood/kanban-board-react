import Board from "react-trello";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteField,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import ReactSearchBox from "react-search-box";
import SidebarLib from "./SidebarLib";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsFillKanbanFill } from "react-icons/bs";
import logo from "../images/logo.png";

function Kanban() {
  const [board, setBoard] = React.useState({
    boardData: { lanes: [] },
  });
  const [inputText, setInputText] = useState("");

  const lanesCollectionRef = collection(db, "lanes");

  const [search, setSearch] = React.useState("");

  const getLanes = async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "lanes"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });

    // const data = await getDocs(lanesCollectionRef);
    // console.log(data);
    console.log(arr);
    setBoard({ boardData: { lanes: arr } });
  };

  useEffect(() => {
    getLanes();
  }, []);

  // push the acquired data to firebase
  const addLane = async (lane) => {
    console.log(lane);
    await addDoc(collection(db, "lanes"), lane);
    getLanes();
  };

  // enable adding new lanes to the board
  const canAddLanes = true;

  // enable editable
  const editable = true;

  // can edit lane title
  const editLaneTitle = true;

  // adding new lane gets saved to firebase
  const onLaneAdd = async (lane) => {
    lane.cards = [];
    lane.label = "";
    lane.currentPage = 1;
    lane.id = lane.title;
    console.log(lane);
    await addLane(lane);
  };

  // on lane update
  const onLaneUpdate = async (lane) => {
    console.log(lane);
    await setDoc(collection(db, "lanes"), lane.id, lane);
  };

  // on lane delete
  // delete entire document and its subcollection using firebase deleteField
  const onLaneDelete = async (laneId) => {
    await deleteDoc(doc(db, "lanes", laneId));
  };

  const handleCardAdd = async (card, laneId) => {
    console.log(card);
    console.log(laneId);
    console.log(board.boardData.lanes);
    const dragLane = board.boardData.lanes.find((lane) => lane.id === laneId);
    // console.log(dragLane);
    dragLane.cards.push({
      id: dragLane.cards.length + 1,
      title: card.title,
      description: card.description,
      // label: card.label,
    });
    console.log(laneId);
    await setDoc(doc(db, "lanes", laneId), dragLane, { merge: true });
  };

  const handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    console.log("drag ended");
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
    const dragLane = board.boardData.lanes.find(
      (lane) => lane.id === sourceLaneId
    );
    const dropLane = board.boardData.lanes.find(
      (lane) => lane.id === targetLaneId
    );
    const card = dragLane.cards.find((card) => card.id === cardId);
    const index = dragLane.cards.indexOf(card);
    dragLane.cards.splice(index, 1);
    dropLane.cards.splice(index, 0, card);
    dropLane.cards.push(card);
    console.log(dragLane);
    console.log(dropLane);
    console.log(board.boardData.lanes);
    await setDoc(doc(db, "lanes", sourceLaneId), dragLane);
    await setDoc(doc(db, "lanes", targetLaneId), dropLane);
  };

  const onCardDelete = async (cardId, laneId) => {
    const dragLane = board.boardData.lanes.find((lane) => lane.id === laneId);
    const card = dragLane.cards.find((card) => card.id === cardId);
    const index = dragLane.cards.indexOf(card);
    dragLane.cards.splice(index, 1);
    await setDoc(doc(db, "lanes", laneId), dragLane);
  };

  const clearOnSelect = (value) => {
    setSearch(value);
  };

  const onFocus = () => {
    setSearch("");
  };

  return (
    <div className="App-intro2">
      <div className="knbn-heading-div">
        <img className="logo-main" src={logo} alt="logo" />
        <h2 className="knbn-heading"> Starboard</h2>
      </div>
      <SidebarLib />
      <ReactSearchBox
        placeholder="Search for a card"
        value="Doe"
        data={board.boardData}
        callback={(record) => console.log(record)}
        clearOnSelect={clearOnSelect}
        onFocus={() => {
          console.log("This function is called when is focussed");
        }}
        onChange={(value) => console.log(value)}
        iconBoxSize="48px"
        leftIcon={<>🔍</>}
      />
      <Board
        editable={editable}
        onCardAdd={handleCardAdd}
        data={board.boardData}
        draggable
        onCardDelete={onCardDelete}
        canAddLanes={canAddLanes}
        editLaneTitle={editLaneTitle}
        onLaneAdd={onLaneAdd}
        onLaneUpdate={onLaneUpdate}
        onLaneDelete={onLaneDelete}
      />
    </div>
  );
}

export default Kanban;
