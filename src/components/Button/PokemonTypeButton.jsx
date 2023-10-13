"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const PokemonTypeButton = ({
  label,
  backgroundColor,
  type,
  width,
  height,
  onClick,
}) => {
  const imageSrc = `/images/pokemon-types/${type}.svg`;
  return (
    <S.ButtonContainer onClick={onClick} style={{ backgroundColor }}>
      <S.Image>
        <Image src={imageSrc} alt={label} width={width} height={height} />
      </S.Image>
      <S.Label>{label}</S.Label>
    </S.ButtonContainer>
  );
};

export default PokemonTypeButton;

export const S = {};
S.ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 6px;
`;

S.Image = styled.div`
  flex: 0 0 auto;
  margin-right: 4px;
  display: flex;
`;

S.Label = styled.span`
  flex: 1;
  text-align: center;
`;
