import Image from "next/image";
import React from "react";

const PokemonTypeButton = ({ label, backgroundColor, type, width, height }) => {
  const style = {
    backgroundColor,
  };
  const imageSrc = `/images/pokemon-types/${type}.svg`;
  return (
    <button style={style}>
      {label}
      <Image src={imageSrc} alt={label} width={width} height={height} />
    </button>
  );
};

export default PokemonTypeButton;
