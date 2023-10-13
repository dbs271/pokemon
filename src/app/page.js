"use client";
import { axiosInstance } from "@/api/axiosInstance";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    try {
      const res = await axiosInstance.get("pokemon?limit=100&offset=0");
      console.log(res.data.results);
      setPokemons(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <S.Article>
      <S.Header></S.Header>
      <S.Section>
        <S.Pokemon>
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => (
              <div key={index}>{name}</div>
            ))
          ) : (
            <S.H2>포켓몬이 없습니다.</S.H2>
          )}
        </S.Pokemon>
      </S.Section>
    </S.Article>
  );
};

export default Home;

export const S = {};
S.Article = styled.article`
  padding-top: 6px;
`;

S.Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  z-index: 50;
`;
S.Section = styled.section`
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 0;
`;
S.Pokemon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 56rem;
`;
S.H2 = styled.h2`
  font-size: medium;
  margin-bottom: 0.5rem;
`;
