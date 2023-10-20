"use client";
import React, { useEffect } from "react";
import styled from "styled-components";

import PokeCard from "@/components/PokeCard/PokeCard";
import { useInfinitePokeQuery } from "@/hooks/querys/useInfinitePokeQuery";
import { BiSearchAlt2 } from "react-icons/bi";

const Home = () => {
  const { data, isFetchingNextPage, hasNextPage, ref } = useInfinitePokeQuery();

  return (
    <S.Article>
      <S.Header>
        <S.SearchBox>
          <S.SearchInput placeholder="검색어를 입력해주세요." />
          <S.SearchButton>
            <BiSearchAlt2 />
          </S.SearchButton>
        </S.SearchBox>
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
S.SearchBox = styled.div`
  position: relative;
`;
S.SearchInput = styled.input`
  width: 320px;
  height: 30px;

  border: 1px solid #000;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
  font-size: 14px;
  :focus {
    border-color: #007bff;
  }
`;
S.SearchButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background-color: transparent;
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
