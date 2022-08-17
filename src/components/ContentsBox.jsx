import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export const ContentsBox = ({randomNum}) => {
    const [input, setInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("1 - 9 사이의 숫자 키 3개를 입력하세요!");
    const [result, setResult] = useState("");
    const [isHomeRun, setIsHomeRun] = useState(false);
    const [score, setScore] = useState(100);

    const handleInput = (e) => {
        const str = e.target.value;

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

        if(strikeCnt === 3) {
            setIsHomeRun(true);
            setErrorMsg("🎉 정답입니다 🎉");
        } else {
            setScore(prev => prev - 1)
            setErrorMsg("땡! 아쉽습니다 😅");
        }
    }    
    
    useEffect(() => {
        if(input.length === 3) {
            console.log("정답", randomNum);
            checkResult(input);
        }
    }, [input])

    return (
        <>
            <h1>숫자 야구</h1>
            <section className="display">
                <div>{input[0] || "1"}</div>
                <div>{input[1] || "2"}</div>
                <div>{input[2] || "3"}</div>
                <input onChange={handleInput} value={input}/>
            </section>
            <p>{errorMsg}</p>
            {isHomeRun ? 
            <button>RESTART</button> : 
            <p className="result">{result}</p>
            }
            <div>Score : {score}</div>
        </>
    )
}
