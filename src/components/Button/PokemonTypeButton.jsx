import Image from "next/image";
import React from "react";

const PokemonTypeButton = ({
  label,
  backgroundColor,
  type,
  width,
  height,
  color,
  fontSize,
  onClick,
}) => {
  const style = {
    backgroundColor,
    color,
    fontSize,
  };
  const imageSrc = `/images/pokemon-types/${type}.svg`;
  return (
    <button style={style} onClic={onClick}>
      {label}
      <Image src={imageSrc} alt={label} width={width} height={height} />
    </button>
  );
};

export default PokemonTypeButton;
