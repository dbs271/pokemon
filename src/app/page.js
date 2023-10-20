"use client";
import React, { useEffect } from "react";
import styled from "styled-components";

import PokeCard from "@/components/PokeCard/PokeCard";
import { useInfinitePokeQuery } from "@/hooks/querys/useInfinitePokeQuery";

import Search from "@/components/Search/Search";

const Home = () => {
  const { data, isFetchingNextPage, hasNextPage, ref } = useInfinitePokeQuery();

  return (
    <S.Article>
      <S.Header>
        <Search />
      </S.Header>
      <S.Section>
        {data && (
          // 데이터가 존재할 때 실행할 코드
          <S.Pokemon>
            {data.pages.map((page, pageIndex) =>
              page.map((pokemon, index) => (
                <PokeCard key={index} name={pokemon.name} url={pokemon.url} />
              ))
            )}
            {isFetchingNextPage && <div>Loading...</div>}
            {!hasNextPage && <div>All Pokemons Loaded</div>}
            <div ref={ref} />
          </S.Pokemon>
        )}
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
  justify-content: center;
  align-items: center;
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
