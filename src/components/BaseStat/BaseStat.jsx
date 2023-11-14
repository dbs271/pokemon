"use client";
import PokeTypeColors from "@/util/PokeTypeColors";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const BaseStat = ({ valueStat, nameStat, type }) => {
  const ref = useRef(null);
  console.log(ref);
  useEffect(() => {
    const setValueStat = ref.current;
    const calc = valueStat * (100 / 255);
    setValueStat.style.width = calc + "%";
  }, [valueStat]);
  return (
    <S.TR>
      <S.TD1>{nameStat}</S.TD1>
      <S.TD2>{valueStat}</S.TD2>
      <td>
        <S.StatBarBox>
          <S.StatBar ref={ref} pokeType={type}></S.StatBar>
        </S.StatBarBox>
      </td>
      <S.TD3>255</S.TD3>
    </S.TR>
  );
};

export default BaseStat;

export const S = {};

S.TR = styled.tr`
  width: 100%;
  color: #fff;
`;

S.TD1 = styled.td`
  @media (min-width: 640px) {
    padding-left: 1.25rem; /* 기본 간격 스케일에서 5 단위에 해당하는 값 */
    padding-right: 1.25rem; /* 기본 간격 스케일에서 5 단위에 해당하는 값 */
  }
`;

S.TD2 = styled.td`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  @media (min-width: 640px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
`;
S.TD3 = styled.td`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  @media (min-width: 640px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;

S.StatBarBox = styled.div`
  display: flex;
  align-items: flex-start;
  height: 0.5rem;
  min-width: 10rem;
  background-color: #4a5568;
  border-radius: 0.25rem;
  overflow: hidden;
`;
S.StatBar = styled.div`
  height: 0.75rem;
  background-color: ${(props) => PokeTypeColors[props.pokeType]};
`;
