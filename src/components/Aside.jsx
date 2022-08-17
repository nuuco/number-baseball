import React from "react";
import styled from "styled-components";
import colorSheet from "../colorSheet";

const ScoreBoard = styled.div`

`;


export const Aside = ({scoreRecord, setScoreRecord}) => {
    const handleClearBtn = () => {
        setScoreRecord([]);
    }
    return (
        <ScoreBoard>
            <h2>점수 보드</h2>
            <section>
                <ul>
                {scoreRecord.map((el, idx) => (
                    <li key={idx}>{el}</li>
                ))}
                </ul>
                <button onClick={handleClearBtn}>Clear</button>
            </section>   
        </ScoreBoard>
    )
}

