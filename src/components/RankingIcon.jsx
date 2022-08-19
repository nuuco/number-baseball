import React, { useEffect, useState } from "react";
import styled from "styled-components";
import shortid from "shortid";

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
  

export const RankingIcon = ({isHomeRun, score}) => {
    const [ranking, setRanking] = useState([]);

    const handleSubmit = (e) => {
        
        const newRank = {
            "id": shortid.generate(),
            "userId": e.target.userId.value,
            "body": e.target.body.value,
            "score": score,
          };


        fetch('http://localhost:3001/rank', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRank)
        }).then((res) => {
          
        })
        .catch((error) => {
          throw Error('could not post the data for that resource');
        });
    }

    useEffect(() => {
        //랭크 가져오기
        fetch('http://localhost:3001/rank')
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.sort((a, b) => b["score"] - a["score"] || -1);
            setRanking(data);
        })
        .catch(() => {
            console.log("fetch error!");
            const rank = mockupData;
            rank.sort((a, b) => b["score"] - a["score"] || -1);
            setRanking(rank);
        })
    }, [])


    return (
        <>
            <button>Ranking</button>
            <section>
                {isHomeRun && 
                <>
                    <p>당신의 점수는 {score}입니다</p>
                    <form onSubmit={handleSubmit}>
                        <label>닉네임
                            <input name="userId" />
                        </label>
                        <label>comment
                            <input name="body" />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </>
                }
                <ul>
                {ranking.map((el, idx) => (
                    <li key={el.id}>
                        <span>{idx + 1}등</span> <span>{el.score}</span>
                        <div>
                            <span>{el.userId}</span> : <span>{el.body}</span>
                        </div>
                    </li>
                ))}
                </ul>
            </section>
        </>
    )
}

