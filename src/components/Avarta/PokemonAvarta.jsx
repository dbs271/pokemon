import Image from "next/image";
import React from "react";
import styled from "styled-components";

const PokemonAvarta = ({ id, width, height, alt, onClick }) => {
  const imageSrc = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : "";
  return (
    <div>
      {id && (
        <S.Image
          src={imageSrc}
          width={width}
          height={height}
          alt={alt}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default PokemonAvarta;

export const S = {};

S.Image = styled(Image)`
  object-fit: contain;
  height: 100%;
`;
