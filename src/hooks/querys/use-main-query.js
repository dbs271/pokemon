import POKE_API from "@/api/main-page-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryConfig } from "./@config";

export const useGetList = (API_KEY) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [API_KEY],
      ({ pageParam = 1 }) => POKE_API.GetList(API_KEY, pageParam),
      {
        ...queryConfig,
        getNextPageParam: (lastPage) => {
          if (lastPage && lastPage.data.page) {
            return lastPage.data.page + 1;
          }
          return null;
        },
      }
    );
  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
};
