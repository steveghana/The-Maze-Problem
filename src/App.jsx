import React, { useEffect, useState, useRef } from "react";
import Mario from "./assets/super-mario-figure_35b28409e48144979b12d328d7e34235.jpg.580x580_q85.jpg";
import Collect from "./assets/pngwing.com.png";
import "./global.css";
function App() {
  const stepsRef = useRef(null);
  const [selectedGridNum, setSelectedGridNum] = useState("");
  const [characterCurrentPosition, setcharacterCurrentPosition] = useState("");
  useEffect(() => {
    if (selectedGridNum) {
      randomCollectibleItems();
    } else {
      let num = parseInt(prompt("Please enter board height"));
      if (!num || num < 2) {
        alert("Please insert a board height greater than 2");
        window.location.reload();
      } else {
        setSelectedGridNum(num);
      }
    }
  }, [selectedGridNum, characterCurrentPosition]);
  //
  const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  //
  const Player = () => {
    let steps = 0;
    const totalGridNum = selectedGridNum * selectedGridNum;
    const middleRow = Math.floor(Math.sqrt(totalGridNum) / 2) + 1;
    const middleGridNumber = Math.floor(
      selectedGridNum * middleRow - Math.floor(selectedGridNum / 2)
    );
    setcharacterCurrentPosition(middleGridNumber);
    let gridNode = document.getElementById(`${middleGridNumber}`);
    const mainCharacter = gridNode.querySelector(".character");
    mainCharacter.style.display = "block";
    //an id used to switch or navigate character positions
    let nodeId = characterCurrentPosition;
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 38:
          if (nodeId - selectedGridNum < 1) return;
          nodeId -= selectedGridNum;
          steps += 1;
          switchPosition(nodeId, steps);
          break;
        case 37:
          nodeId -= 1;
          if (nodeId < 1) return (nodeId = 1);
          steps += 1;
          switchPosition(nodeId, steps);
          break;
        case 39:
          nodeId += 1;
          if (nodeId > totalGridNum) return (nodeId = totalGridNum);
          steps += 1;
          switchPosition(nodeId, steps);
          break;
        case 40:
          if (nodeId + selectedGridNum > totalGridNum) return;
          nodeId += selectedGridNum;
          steps += 1;
          switchPosition(nodeId, steps);
          break;
        default:
          break;
      }
    });
  };
  //
  const switchPosition = (id, steps) => {
    let aciveNode = document.getElementById(`${id}`);
    [...document.querySelectorAll(".character")].forEach((c) => {
      c.style.display = "none";
    });
    aciveNode.querySelector(".character").style.display = "block";
    if (aciveNode.firstChild.style.display === "block") {
      aciveNode.firstChild.style.display = "none";
    }
    const filtered = [...document.querySelectorAll(".grid_node")].filter(
      (item) => item.firstChild.style.display === "block"
    );
    stepsRef.current.innerText = steps;
    if (filtered.length) return;
    setTimeout(() => {
      alert(`It took ${stepsRef.current.innerText} steps to collect all items`);
      window.location.reload();
    }, 60);
  };
  ////
  const randomCollectibleItems = () => {
    let numOfRandomcharacters = selectedGridNum;
    let totalGridNum = selectedGridNum * selectedGridNum;
    Player();
    for (let i = 0; i < numOfRandomcharacters; i++) {
      let randomNum = randomIntFromRange(1, totalGridNum);
      let randomGridNode = document.getElementById(
        `${
          //to avoid character appearing in same position as collectables
          randomNum === characterCurrentPosition
            ? characterCurrentPosition + 1
            : randomNum
        }`
      );
      let randomNode = randomGridNode.firstChild;
      randomNode.style.display = "block";
      randomNode.setAttribute("id", randomGridNode.id);
    }
  };
  //////
  const board = () => {
    let grid = [];
    let num = 0;
    for (let row = 0; row < selectedGridNum; row++) {
      const currentRow = [];
      for (let col = 0; col < selectedGridNum; col++) {
        num += 1;
        currentRow.push(
          <div key={Math.random()} id={num} className="grid_node">
            <img src={Collect} className="collectable_nodes" alt="" />
            <img src={Mario} className="character" alt="" />
          </div>
        );
      }
      grid.push(currentRow);
    }
    return { grid };
  };
  const { grid } = board();

  return (
    <div className="container">
      <div className="steps">
        Steps:{" "}
        <span ref={stepsRef} className="steps_num">
          0
        </span>
      </div>
      {grid.map((row, index) => (
        <div key={index} style={{ display: "flex" }}>
          {row}
        </div>
      ))}
    </div>
  );
}
export default App;
