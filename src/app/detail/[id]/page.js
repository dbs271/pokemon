"use client";

import { axiosInstance } from "@/api/@core/axiosInstance";
import {
  ArrowLeft,
  Balance,
  GreaterThan,
  LessThan,
  Loading,
  Vector,
} from "@/assets/PokeAssets";
import PokeTypeColors from "@/util/PokeTypeColors";
import axios from "axios";
import Image from "next/image";
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

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <S.Article>
      <S.Container pokeType={pokemon?.types?.[0]}>
        {pokemon.previous && (
          <S.LeftLink href={`/pokemon/${pokemon.previous}`}>
            <LessThan />
          </S.LeftLink>
        )}

        {pokemon.next && (
          <S.RightLink href={`/pokemon/${pokemon.next}`}>
            <GreaterThan />
          </S.RightLink>
        )}
        <S.Section>
          <S.LinkBox>
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
            <S.PoekmonName>{pokemon.name}</S.PoekmonName>
            <S.PokemonId>
              #{pokemon.id.toString().padStart(3, "00")}
            </S.PokemonId>
          </S.LinkBox>
          <S.ImageBox>
            <Image width={200} height={200} src={img} alt={pokemon.name} />
          </S.ImageBox>
        </S.Section>
        <S.BottomSection>
          <S.PokemonType>{/* pokemonType */}</S.PokemonType>
          <S.PokemonInfo pokeType={pokemon?.types?.[0]}>정보</S.PokemonInfo>
          <S.InfoContainer>
            <S.InfoBox>
              <S.PokemonWeight>Weight</S.PokemonWeight>
              <S.InfoIcon>
                <Balance />
                {pokemon.weight}kg
              </S.InfoIcon>
            </S.InfoBox>
            <S.InfoBox>
              <S.PokemonWeight>Height</S.PokemonWeight>
              <S.InfoIcon>
                <Vector />
                {pokemon.height}m
              </S.InfoIcon>
            </S.InfoBox>
            <S.InfoBox>
              <S.PokemonWeight>Abilities</S.PokemonWeight>
              {pokemon.abilities.map((ability) => (
                <S.Ability key={ability}>{ability}</S.Ability>
              ))}
            </S.InfoBox>
          </S.InfoContainer>
          <S.PokemonInfo pokeType={pokemon?.types?.[0]}>
            기본 능력치
          </S.PokemonInfo>
          <S.StatContainer>Stat</S.StatContainer>
          {pokemon.DamageRelations && (
            <S.PokemonDamage>
              <S.PokemonInfo pokeType={pokemon?.types?.[0]}>
                데미지 관계
              </S.PokemonInfo>
              데미지
            </S.PokemonDamage>
          )}
        </S.BottomSection>
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
  left: 0;
  top: 50%;
  z-index: 50;
  transform: translateY(-50%); /* 수정: 중앙 정렬을 위한 translateY 설정 */
  width: 16px;
  height: 16px;
`;

S.RightLink = styled(Link)`
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 50;
  transform: translateY(-50%); /* 수정: 중앙 정렬을 위한 translateY 설정 */
  width: 16px;
  height: 16px;
`;

S.Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 20;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
`;

S.ImageBox = styled.div`
  position: relative;
  height: auto;
  max-width: 15.5rem;
  z-index: 20;
  margin-top: 6px;
  margin-bottom: 16px;
`;
S.LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

S.PoekmonName = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  text-transform: capitalize;
`;

S.PokemonId = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
`;
S.PokemonInfo = styled.h2`
  color: ${(props) => PokeTypeColors[props.pokeType]};
  font-weight: 400;
  text-align: center;
`;
S.BottomSection = styled.section`
  width: 100%;
  min-height: 65%;
  height: 100%;
  background-color: #374151;
  z-index: 10;
  padding: 10px 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

S.PokemonType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

S.InfoIcon = styled.div`
  font-size: small;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* 아이콘과 글자 간격 조절 */
`;

S.PokemonWeight = styled.h4`
  font-weight: 400;
  font-size: small;
  color: #fff;
  margin-bottom: 0.25rem;
`;
S.InfoBox = styled.div`
  width: 100%;
  margin-top: 0.25rem; /* 위쪽 마진을 추가하여 전반적인 간격 조절 */
`;
S.Ability = styled.div`
  color: #fff;
  font-weight: 300;
  text-transform: capitalize;
`;

S.InfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 400px;
  text-align: center;
`;
S.StatContainer = styled.div``;
S.PokemonDamage = styled.div`
  width: 83.333333%;
`;
