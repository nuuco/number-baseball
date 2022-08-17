import React, { useEffect, useState } from "react";
import styled from "styled-components";

const mockupData =  [
    {
      "id": 1,
      "userId": "김코딩",
      "body": "개쉬움ㅋㅋㅋㅋㅋㅋㅋ",
      "score": 97
    },
    {
      "id": 2,
      "userId": "박해커",
      "body": "~( ^3^)~룬루랄라ㅏㅏ",
      "score": 95
    },
    {
        "id": 3,
        "userId": "김코딩",
        "body": "개쉬움ㅋㅋㅋㅋㅋㅋㅋ",
        "score": 94
    }
  ];
  

export const RankingIcon = ({isHomeRun}) => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        //랭크 가져오기
        fetch('http://localhost:3001/rank')
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.sort((a, b) => b["score"] - a["score"]);
            setRanking(data);
        })
        .catch(() => {
            console.log("fetch error!");
            const rank = mockupData;
            rank.sort((a, b) => b["score"] - a["score"]);
            setRanking(rank);
        })
    }, [])


    return (
        <>
            <button>Ranking</button>
            <section>
                <ul>
                {ranking.map((el, idx) => (
                    <li key={el.id}>
                        <span>{idx + 1}등</span>
                        <div>
                            <span>{el.userId}</span><span>{el.body}</span>
                        </div>
                    </li>
                ))}
                </ul>
            </section>
        </>
    )
}

