import Image from "next/image";
import React from "react";

const PokemonAvarta = ({ id, width, height, name, onClick }) => {
  const imageSrc = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : "";
  return (
    <div>
      {id && (
        <Image
          src={imageSrc}
          width={width}
          height={height}
          alt={name}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default PokemonAvarta;
