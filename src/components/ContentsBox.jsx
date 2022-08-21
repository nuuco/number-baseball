import React from "react";
import { useState, useEffect } from "react";
import { SoundIcon } from "./SoundIcon";
import styled from "styled-components";
import colorSheet from "../colorSheet";
import { useRef } from "react";

const ContentsInner = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

h1 {
    color: ${colorSheet.mainColor};
    margin-top: auto;
    padding-top: 20px;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 700;
}

input {
    height: 30px;
    border: none;
    opacity: 0;
}

.msg,
.result,
.score {
    font-size: 20px;
    font-weight: 500;
    color: ${colorSheet.blackFontColor};
}

.msg {
    margin-bottom: 30px;
    font-weight: 700;
    &.basic {
    color: ${colorSheet.mainColor};
    }
    &.wrong {
        color: ${colorSheet.errorMsgColor};
    }
    &.end {
        color: ${colorSheet.blackFontColor};
    }
}

.score {
    margin-top: auto;
    margin-bottom: 30px;
    color: ${colorSheet.scoreBoardTitle};
}

.result {
    height: 40px;
}


.restart-btn {
    display: block;
    width: 140px;
    height: 40px;
    border: 2px solid ${colorSheet.mainColor};
    color: ${colorSheet.mainColor};
    background-color: ${colorSheet.whiteFontColor};
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 20px;

    &:hover {
        background-color: ${colorSheet.mainColor};
        color: ${colorSheet.whiteFontColor};
        border-color: ${colorSheet.mainColor};
        box-shadow: 0 3px 3px rgba(0, 0, 0, .4);
    }
}


`;

const NumberBoxes = styled.div`
display: flex;

div:nth-child(2) {
    margin: 0 20px;
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vh;
    height: 15vh;
    background-color: ${colorSheet.numInputBg};
    border: 3px solid ${colorSheet.numInputBorder};
    border-radius: 10px;
    color: ${colorSheet.numInputText};
    font-size: 44px;
    font-weight: 500;

    &.fill {
        background-color: ${colorSheet.mainColor};
        border-color: ${colorSheet.mainColor};
        color: ${colorSheet.whiteFontColor};
    }

    &.correct {
        background-color: ${colorSheet.correctNumInputColor};
        border-color: ${colorSheet.correctNumInputColor};
        color: ${colorSheet.whiteFontColor};
    }

    &.incorrect {
        background-color: ${colorSheet.incorrectNumInputColor};
        border-color: ${colorSheet.incorrectNumInputColor};
        color: ${colorSheet.whiteFontColor};
    }
}
`;


const IconsBox = styled.div`
    
`;


export const ContentsBox = ({randomNum, setScoreRecord, inputRef}) => {
    const [input, setInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("1 - 9 사이의 숫자 키 3개를 입력하세요!");
    const [msgClass, setMsgClass] = useState("basic")
    const [result, setResult] = useState("");
    const [wrongInputIdx, setWrongInputIdx] = useState(-1);
    const [isHomeRun, setIsHomeRun] = useState(false);
    const [score, setScore] = useState(100);
    const [delay, setDelay] = useState(false);

    const handleInput = (e) => {
        const str = e.target.value;
        setWrongInputIdx(-1);

        if(str.length <= 3 && checkInput(str)) {
            setInput(str);
        }
    }

    const checkInput = (str) => {
        let isValid = true;
        let msg = "1 - 9 사이의 숫자 키 3개를 입력하세요!";
        if(/\D/.test(str)) {
            msg = "숫자만 입력해주세요!";
            isValid = false;
        } else if (/0/.test(str)) {
            msg = "0은 입력할 수 없습니다!";
            isValid = false;
        } else if(/(\d).?\1/.test(str)) {
            msg = "서로 다른 숫자를 입력하세요!";
            isValid = false;
        }

        setErrorMsg(msg);
        if(!isValid) {
            delayWrongInput(input.length);
            setMsgClass("wrong");
        } else {
            setMsgClass("basic");
        }
        return isValid;
    }

    //결과값(볼 스트라이크 수) 만들어주는 메소드
    const checkResult = (input) => {
        const numArr = input.split("").map(el => Number(el));
        let strikeCnt = 0;
        let ballCnt = 0;
        
        //인덱스 상관없이 일치하는 숫자 개수
        const sameNumCnt = numArr.filter(num => {
            if(randomNum.includes(num)) return true;
            return false;
        }).length;

        //인덱스까지 일치하는 숫자 개수
        strikeCnt = numArr.filter((num, idx) => {
            if(randomNum[idx] === num) return true;
            return false;
        }).length;

        //ballCnt 는 sameNumCnt(일치하는 개수) - strikeCnt(인덱스까지 일치하는 개수) 가 된다.
        ballCnt = sameNumCnt - strikeCnt;

        let msg = "";
        if(ballCnt + strikeCnt === 0) {
            msg = "Nothing!";
        } else if(ballCnt !== 0 && strikeCnt === 0) {
            msg = ballCnt + " Ball";
        } else if(ballCnt === 0 && strikeCnt !== 0) {
            msg = strikeCnt + " Strike";
        } else {
            msg = ballCnt + " Ball " + strikeCnt + " Strike";
        }

        setResult(msg && "⚾️ " + msg);
        updateScoreRecord(input, ballCnt, strikeCnt);

        if(strikeCnt === 3) {
            setIsHomeRun(true);
            setErrorMsg("🎉 정답입니다 🎉");
        } else {
            setScore(prev => prev - 1);
            setErrorMsg("땡! 아쉽습니다 😅");
            delayStart();
        }

        setMsgClass("end");

    }    

    //점수 보드 기록하는 함수
    const updateScoreRecord = (input, ballCnt, strikeCnt) => {
        let msg = input + " ";
        if(ballCnt === 0 && strikeCnt === 0) {
            msg += "❌ Out";
        } else if (strikeCnt === 3) {
            msg += "🎉 Win!!!!!!";
        } else {
            msg += `⚾ ${ballCnt === 0 ? "" : ballCnt + "B"} ${strikeCnt === 0 ? "" : strikeCnt + "S"}`;
        }
        setScoreRecord(prev => [...prev, msg]);
    }

    const handleRestart = () => {
        const isRestart = global.confirm("재시작 하시겠습니까?");
        if(isRestart) {
            window.location.reload(); // 이 한 줄로 초기화!
        }
    }

    //3개 입력 완료 후 틀렸을 때 1초 지연후 input 값 리셋
    const delayStart = () => {
        setDelay(true);
        setTimeout(() => {
            setDelay(false);
            setInput("");
            setMsgClass("basic");
            setErrorMsg("1 - 9 사이의 숫자 키 3개를 입력하세요!");
        }, 1000);
    }

    //잘못된 입력값 입력시 X 가 잠깐 표시되게 하는 함수
    const delayWrongInput = (idx) => {
        setWrongInputIdx(idx);
        setTimeout(() => {
            setWrongInputIdx(-1);
        }, 800);
    }

    //숫자 박스에 class 를 세팅해주는 함수
    const inputClassName = (order) => {
        let className = "";
        if(input[order]) className += "fill "; 
        if(isHomeRun) className += "correct ";
        if(!isHomeRun && input.length === 3) className += "incorrect ";
        return className;
    }
    
    useEffect(() => {
        if(input.length === 3) {
            checkResult(input);
        }
    }, [input])

    return (
        <>
            <ContentsInner>
                <h1>숫자 야구</h1>
                <section className="display">
                    <NumberBoxes>
                        <div className={inputClassName(0)}>{wrongInputIdx === 0 ? "❌" : input[0] || "1"}</div>
                        <div className={inputClassName(1)}>{wrongInputIdx === 1 ? "❌" : input[1] || "2"}</div>
                        <div className={inputClassName(2)}>{wrongInputIdx === 2 ? "❌" : input[2] || "3"}</div>
                    </NumberBoxes>
                    <input autoFocus ref={inputRef} onChange={handleInput} value={input} readOnly={isHomeRun || delay ? true : false} />
                </section>
                <p className={`msg ${msgClass}`}>{errorMsg}</p>
                {isHomeRun ? 
                <button className="restart-btn" onClick={handleRestart} >RESTART</button> : 
                <p className="result">{result}</p>
                }
                <p className="score">Score : {score}</p>
            </ContentsInner>
            <IconsBox>
                
            </IconsBox>
        </>
    )
}
