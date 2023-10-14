"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PokemonAvarta = ({ id, width, height, alt, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setOpacity(100); // 이미지가 로드되면 opacity를 100으로 설정
    }
  }, [isLoading]);

  const imageSrc = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : "";
  return (
    <>
      {isLoading && <S.Loading>...loading</S.Loading>}
      <div>
        {id && (
          <S.Image
            src={imageSrc}
            width={width}
            height={height}
            alt={alt}
            onClick={onClick}
            onLoad={() => setIsLoading(false)}
            opacity={opacity}
          />
        )}
      </div>
    </>
  );
};

export default PokemonAvarta;

export const S = {};

S.Image = styled(Image)`
  object-fit: contain;
  height: 100%;
  opacity: ${(props) => props.opacity};
`;
S.Loading = styled.div`
  position: absolute;
  height: 100%;
  z-index: 10;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
`;
