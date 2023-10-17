"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PokeCard from "@/components/PokeCard/PokeCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/@core/axiosInstance";
import UseObserver from "@/hooks/use-observer";
import { useInView } from "react-intersection-observer";

const Home = () => {
  // React Query를 사용하여 데이터 및 페이지 처리 설정
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["pokemonList"], // 쿼리 키
      async ({ pageParam = 0 }) => {
        const res = await axiosInstance.get(
          // `pokemon?limit=36&offset=${pageParam}`
          "pokemon?",
          {
            params: {
              limit: 36,
              offset: pageParam,
            },
          }
        );
        return res.data.results;
      },
      {
        getNextPageParam: (lastPage, pages) => {
          // 다음 페이지의 데이터를 가져오기 위한 페이지 번호 설정
          return lastPage.length * pages.length;
        },
      }
    );
  useEffect(() => {
    if (inView && hasNextPage) {
      console.log(inView, "@@");
      fetchNextPage();
    }
  }, [inView]);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 100
  //     ) {
  //       fetchNextPage();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [fetchNextPage]);

  return (
    <S.Article>
      <S.Header></S.Header>
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
        {/* <UseObserver
          onClick={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        /> */}
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
