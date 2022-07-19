import React from "react";
import styled from "styled-components";


const AsideBox = styled.aside`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const AsideHeader = styled.h2`

`;

const ScoreUl = styled.ul`
    background-color: rgba(71, 53, 182, 0.05);
    border-radius: 10px;
    border: 2px solid rgba(71, 53, 182, 0.1);
    flex: 1;
`;

const List = styled.li`

`;


const Aside = () => {

    return (
        <AsideBox>
            <AsideHeader>점수 보드</AsideHeader>
            <ScoreUl>

            </ScoreUl>
        </AsideBox>
    )
}


export default Aside;