import Image from "next/image";
import React from "react";

const PokemonAvarta = ({ id, width, height }) => {
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div>
      <Image src={imageSrc} width={width} height={height} alt={id} />
    </div>
  );
};

export default PokemonAvarta;
