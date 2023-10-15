"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PokeCard from "@/components/PokeCard/PokeCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/@core/axiosInstance";

const Home = () => {
  // React Query를 사용하여 데이터 및 페이지 처리 설정
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["pokemonList"], // 쿼리 키
      ({ pageParam = 0 }) => {
        return axiosInstance
          .get(`pokemon?limit=100&offset=${pageParam}`)
          .then((res) => res.data.results);
      },
      {
        getNextPageParam: (lastPage, pages) => {
          // 다음 페이지의 데이터를 가져오기 위한 페이지 번호 설정
          return lastPage.length * pages.length;
        },
      }
    );
  console.log({ data });
  // 스크롤 이벤트 감지하여 다음 페이지 데이터를 가져오는 함수
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.Article>
      <S.Header></S.Header>
      <S.Section>
        {data ? (
          // 데이터가 존재할 때 실행할 코드
          <S.Pokemon>
            {data.pages.map((page, pageIndex) =>
              page.map((pokemon, index) => (
                <PokeCard key={index} name={pokemon.name} url={pokemon.url} />
              ))
            )}
            {isFetchingNextPage && <div>Loading...</div>}
            {!hasNextPage && <div>All Pokemons Loaded</div>}
          </S.Pokemon>
        ) : (
          // 데이터가 아직 로딩 중일 때 실행할 코드
          <div>Loading...</div>
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
