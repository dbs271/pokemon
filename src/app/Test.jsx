"use client";
import React, { useRef } from "react";
import styled from "styled-components";

import PokeCard from "@/components/PokeCard/PokeCard";
import { useInfinitePokeQuery } from "@/hooks/querys/useInfinitePokeQuery";

import Search from "@/components/Search/Search";

const Home = () => {
  const { data, isFetchingNextPage, hasNextPage, ref, setSearch, search } =
    useInfinitePokeQuery();

  const inputRef = useRef("");

  const searchKeyword = (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value;
    setSearch(keyword);
    inputRef.current.value = "";
  };

  return (
    <S.Article>
      <S.Header>
        <Search inputRef={inputRef} searchKeyword={searchKeyword} />
      </S.Header>
      <S.Section>
        {data && (
          // 데이터가 존재할 때 실행할 코드
          <S.Pokemon>
            {search
              ? // 검색 결과 렌더링
                data.map((pokemon, index) => (
                  <PokeCard key={index} name={pokemon.name} url={pokemon.url} />
                ))
              : // 무한 스크롤 데이터 렌더링
                data.pages.map((page, pageIndex) =>
                  page.map((pokemon, index) => (
                    <PokeCard
                      key={index}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
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
