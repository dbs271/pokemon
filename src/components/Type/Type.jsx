import PokeTypeColors from "@/util/PokeTypeColors";
import React from "react";
import styled from "styled-components";

const Type = ({ type, damageValue }) => {
  return (
    <div>
      <S.Type type={type}>{type}</S.Type>
      {damageValue && <S.DamageValue>{damageValue}</S.DamageValue>}
    </div>
  );
};

export default Type;

export const S = {};
S.DamageValue = styled.span`
  background-color: gray;
  padding: 0.125rem;
  border-radius: 0.25rem;
`;
S.Type = styled.span`
  height: 1.5rem;

  padding-right: 1.25rem;
  padding-left: 1.25rem;
  border-radius: 1rem;
  background-color: ${(props) => PokeTypeColors[props.type]};
  font-weight: bold;
  color: #374151;
  font-size: 1rem;
  line-height: 0.8rem;
  text-transform: capitalize;
  display: flex;
  gap: 1px;
  justify-content: center;
  align-items: center;
`;
