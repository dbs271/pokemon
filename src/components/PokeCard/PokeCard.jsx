"use client";
import { axiosInstance } from "@/api/axiosInstance";
import React, { useEffect, useState } from "react";
import PokemonAvarta from "../Avarta/PokemonAvarta";

const PokeCard = ({ url, name }) => {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    fetchPokeDetailData();
  }, []);
  const fetchPokeDetailData = async () => {
    try {
      const res = await axiosInstance.get(url);

      const pokemonData = formatPokemonData(res.data);
      setPokemon(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };
  const formatPokemonData = (params) => {
    const { id, types, name } = params;
    const typeNames = types.map((type) => type.type.name);
    const PokeData = {
      id,
      name,
      type: typeNames,
    };
    return PokeData;
  };

  console.log(pokemon?.name);
  return (
    <div>
      <PokemonAvarta
        id={pokemon?.id}
        width={100}
        height={100}
        alt={pokemon?.name}
      />
    </div>
  );
};

export default PokeCard;
