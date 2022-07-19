import React from "react";
import Aside from "./components/Aside";
import NumberBoard from "./components/NumberBoard";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #191919;
  }

  .inner {
    display: flex;
    height: 100vh;
  }

  .inner > aside {
    flex: 320;
  }

  .inner > main {
    flex: 1190;
  }

  .inner > main > h1 {
    color: rgba(71, 53, 182, 1);
    font-size: 60px;
  }
`;

function App() {

  return (
    <div id="app">
    <GlobalStyle/>
    <section className="inner">
      <Aside />
      <main>
        <h1>숫자 야구</h1>
        <NumberBoard/>
      </main>
    </section>
    </div>
  );
}

export default App;