import "./App.css";
import React, { useEffect } from "react";
import Board from "react-trello";
import { db } from "./Firebase";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

function App() {
  const [board, setBoard] = React.useState({
    boardData: { lanes: [] },
  });
  const lanesCollectionRef = collection(db, "lanes");

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

  const handleCardAdd = async (card, laneId) => {
    console.log(card);
    console.log(laneId);
    const dragLane = board.boardData.lanes.find((lane) => lane.id === laneId);
    // console.log(dragLane);
    dragLane.cards.push({
      id: dragLane.cards.length + 1,
      title: card.title,
      description: card.description,
      // label: card.label,
    });
    await setDoc(doc(db, "lanes", laneId), dragLane);
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
    // dropLane.cards.push(card);
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

  const cardStyle = {
    background: "white",
    borderRadius: "5px",
    padding: "10px",
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const style = {
    fontFamily: "Verdana",
    fontSize: "1rem",
    fontColor: "white",
  };

  const laneStyle = {
    fontFamily: "Verdana",
    fontSize: "1rem",
    fontColor: "white",
  };

  return (
    <div className="App">
      <div className="App-header">
        <h3>React Trello Demo</h3>
      </div>
      <div className="App-intro">
        <Board
          editable
          onCardAdd={handleCardAdd}
          data={board.boardData}
          draggable
          handleDragEnd={handleDragEnd}
          onCardDelete={onCardDelete}
          cardStyle={cardStyle}
          style={style}
          laneStyle={laneStyle}
          style={{ backgroundColor: "rgb(238,238,238)", fontFamily: "Verdana" }}
        />
      </div>
    </div>
  );
}

export default App;
