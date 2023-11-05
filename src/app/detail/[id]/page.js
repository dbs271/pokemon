"use client";

import { axiosInstance } from "@/api/@core/axiosInstance";
import { GreaterThan, LessThan, Loading } from "@/assets/PokeAssets";
import PokeTypeColors from "@/util/PokeTypeColors";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Detail = () => {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const pokemonId = params.id;

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    const url = axiosInstance.get(`pokemon/${pokemonId}`);
    try {
      const { data: pokemonData } = await url;

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } =
          pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);

        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );

        const formatedPokemonData = {
          id,
          name,
          types: types.map((type) => type.type.name),
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPreviousPokemon.previous,
          next: nextAndPreviousPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations: DamageRelations,
        };
        setPokemon(formatedPokemonData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD,
  ]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEP.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  const formatPokemonAbilities = (abilities) => {
    return abilities
      .filter((_, index) => index <= 1)
      .map((obj) => obj.ability.name.replaceAll("-", " "));
  };

  const getNextAndPreviousPokemon = async (id) => {
    const urlPokemon = axiosInstance.get(`/pokemon?limit=1&offset=${id - 1}`);

    const { data: pokemonData } = await urlPokemon;

    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));

    const previousResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));

    return {
      next: nextResponse?.data?.results?.[0].name,
      previous: previousResponse?.data?.results?.[0].name,
    };
  };

  if (isLoading)
    return (
      <S.Loading>
        <Loading />
      </S.Loading>
    );
  if (!isLoading && !pokemon) return <div>...NOT FOUND</div>;

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;

  return (
    <S.Article>
      <S.Container pokeType={pokemon?.types?.[0]}>
        {pokemon.previous && (
          <S.LeftLink href={`/pokemon/${pokemon.previous}`}>
            <LessThan />
          </S.LeftLink>
        )}
        asdasd
        {pokemon.next && (
          <S.RightLink href={`/pokemon/${pokemon.next}`}>
            <GreaterThan />
          </S.RightLink>
        )}
      </S.Container>
    </S.Article>
  );
};

export default Detail;

export const S = {};
S.Loading = styled.div`
  position: absolute;
  height: auto;
  width: auto;
  top: calc(33%);
  transform: translateX(50%);
  left: 50%;
  z-index: 50;
`;

S.Article = styled.article`
  display: flex;
  align-items: center;
  gap: 1;
  flex-direction: column;
  width: 100%;
`;

S.Container = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
  align-items: center;
  background-color: ${(props) => PokeTypeColors[props.pokeType]};
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
`;

S.LeftLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  transform: translateY(-50%); /* 수정: 중앙 정렬을 위한 translateY 설정 */
  width: 16px;
  height: 16px;
`;

S.RightLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;
  transform: translateY(-50%); /* 수정: 중앙 정렬을 위한 translateY 설정 */
  width: 16px;
  height: 16px;
`;
