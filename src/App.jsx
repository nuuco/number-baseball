import React from "react";
import styled from "styled-components";
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
  return (
    <div id="app">
      <GlobalStyle/>
      <main>
        <Aside/>
        <ContentsBox/>
        <SoundIcon/>
      </main>
    </div>
  );
}

export default App;