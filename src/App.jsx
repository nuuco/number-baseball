import React from "react";
import {useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Aside } from "./components/Aside";
import { ContentsBox } from "./components/ContentsBox";
import { SoundIcon } from "./components/SoundIcon";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 1rem;
  }
`;

function App() {
  const [randomNum, setRandomNum] = useState([]);
  const [scoreRecord, setScoreRecord] = useState([]);
  
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
    <div id="app">
      <GlobalStyle/>
      <main>
        <Aside scoreRecord={scoreRecord} />
        <ContentsBox randomNum={randomNum} setScoreRecord={setScoreRecord} />
        <SoundIcon/>
      </main>
    </div>
  );
}

export default App;