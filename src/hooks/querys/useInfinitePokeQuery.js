"use client";
import { axiosInstance } from "@/api/@core/axiosInstance";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinitePokeQuery = () => {
  const [search, setSearch] = useState("");
  const [ref, inView] = useInView();

  const {
    data: allData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["pokemonList"],
    async ({ pageParam = 0 }) => {
      const res = await axiosInstance.get("pokemon?", {
        params: {
          limit: 36,
          offset: pageParam,
        },
      });
      return res.data.results;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length * pages.length;
      },
    }
  );

  const { data: searchData } = useQuery(
    ["pokemonList", search],
    async () => {
      const res = await axiosInstance.get(`pokemon/${search}`);
      return [
        {
          name: res.data.name,
          id: res.data.id,
          url: `pokemon/${res.data.id}`, // url 추가
        },
      ];
    },
    {
      enabled: !!search, // 검색어가 있을 때만 쿼리를 실행
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    data: search ? searchData : allData,
    isFetchingNextPage,
    hasNextPage,
    ref,
    search,
    setSearch,
  };
};
