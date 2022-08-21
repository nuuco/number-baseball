import React from "react";
import "./App.css";
import {useEffect, useState, useRef } from "react";
import { Aside } from "./components/Aside";
import { ContentsBox } from "./components/ContentsBox";


function App() {
  const [randomNum, setRandomNum] = useState([]);
  const [scoreRecord, setScoreRecord] = useState([]);
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    inputRef.current.focus();
}
  
  useEffect(() => {
    //랜덤 숫자 3개 생성 함수
    const createNumber = () => {
      let num_1 = Math.floor(Math.random() * 9) + 1;
      let num_2 = Math.floor(Math.random() * 9) + 1;
      let num_3 = Math.floor(Math.random() * 9) + 1;
      while(num_1 === num_2 || num_1 === num_3 || num_2 === num_3) {
        num_1 = Math.floor(Math.random() * 9) + 1;
        num_2 = Math.floor(Math.random() * 9) + 1;
        num_3 = Math.floor(Math.random() * 9) + 1;
      }
      return [num_1, num_2, num_3];
    }
    setRandomNum(createNumber());

  }, [])

  return (
    <div id="app" onClick={handleInputFocus}>
      <main>
        <Aside scoreRecord={scoreRecord} setScoreRecord={setScoreRecord}  />
        <ContentsBox randomNum={randomNum} setScoreRecord={setScoreRecord} inputRef={inputRef} />
      </main>
    </div>
  );
}

export default App;