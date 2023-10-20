import { axiosInstance } from "@/api/@core/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinitePokeQuery = () => {
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
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
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return { data, isFetchingNextPage, hasNextPage, ref };
};
