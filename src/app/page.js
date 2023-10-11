import PokemonTypeButton from "@/components/Button/PokemonTypeButton";
import BackgroundColors from "@/util/BackgroundColor";

import React from "react";

const page = () => {
  const types = {
    type: "normal",
  };
  const bColor = BackgroundColors[types.type];

  return (
    <div>
      <PokemonTypeButton
        label="normal"
        backgroundColor={bColor}
        type={types.type}
        width={20}
        height={20}
      />
    </div>
  );
};

export default page;
