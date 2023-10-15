"use client";
import { axiosInstance } from "@/api/@core/axiosInstance";
import PokeTypeColors from "@/util/PokeTypeColors";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
    <>
      {pokemon && (
        <S.Link href={`/pokemon/${name}`}>
          <S.NumberBox pokeType={pokemon?.type[0]}>
            #{pokemon?.id.toString().padStart(3, "00")}
          </S.NumberBox>
          <S.ImageContainer>
            <S.ImageBox>
              <PokemonAvarta
                id={pokemon?.id}
                width={100}
                height={100}
                alt={pokemon?.name}
              />
            </S.ImageBox>
          </S.ImageContainer>
          <S.NameBox pokeType={pokemon?.type[0]}>{pokemon.name}</S.NameBox>
        </S.Link>
      )}
    </>
  );
};

export default PokeCard;

export const S = {};

S.Link = styled(Link)`
  box-sizing: border-box;
  border-radius: 0.5rem;
  width: 8.5rem;
  height: 8.5rem;
  z-index: 0;
  background-color: rgb(30, 41, 59);
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;

S.NumberBox = styled.div`
  height: 1.5rem;
  width: 95%;
  padding-top: 1px;
  justify-content: flex-end;
  color: ${(props) => PokeTypeColors[props.pokeType]};
  display: flex;
`;

S.ImageContainer = styled.div`
  width: 100%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
S.ImageBox = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  height: 5.5rem;
  flex-basis: auto;
  justify-content: center;
  align-items: center;
`;
S.NameBox = styled.div`
  color: #fff;
  background-color: ${(props) => PokeTypeColors[props.pokeType]};
  height: 1.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  text-transform: uppercase;
  font-size: medium;
  padding-top: 4px;
  text-align: center;
`;
