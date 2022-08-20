import React from "react";
import styled from "styled-components";
import colorSheet from "../colorSheet";

const ScoreBoard = styled.div`
display: flex;
flex-direction: column;
font-size: 18px;
font-weight: 500;
flex-basis: 20%;
min-width: 200px;

    h2 {
        font-size: 16px;
        margin-bottom: 6px;
        color: ${colorSheet.scoreBoardTitle};
    }
    section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: ${colorSheet.scoreBoardBg};
        border: 2px solid ${colorSheet.scoreBoardBorder};
        border-radius: 10px;
    }

    ul {
        flex: 1 0 0;
        overflow: auto;
        padding: 20px 23px 0 23px;
        margin-bottom: 10px;
        line-height: 1.6;
        overflow: auto;
    }

    li:last-child {
        margin-bottom: 50px;
    }

    .clear-btn {
        display: block;
        width: 70%;
        height: 40px;
        margin: 20px auto;
        border: 2px solid ${colorSheet.mainColor};
        background-color: transparent;
        border-radius: 30px;
        color: ${colorSheet.mainColor};
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
    }

    .clear-btn:hover {
        background-color: ${colorSheet.mainColor};
        color: ${colorSheet.whiteFontColor};
    }

    .clear-btn.invalid {
        background-color: ${colorSheet.scoreBoardTitle};
        border-color: ${colorSheet.scoreBoardTitle};
        color: ${colorSheet.whiteFontColor};
    }
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
                <button className={`clear-btn ${scoreRecord.length === 0 ? "invalid" : ""}`} onClick={handleClearBtn}>Clear</button>
            </section>   
        </ScoreBoard>
    )
}

