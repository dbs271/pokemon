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
        getNextPageParam: (lastPage, pages) => {
          // 다음 페이지의 데이터를 가져오기 위한 페이지 번호 설정
          return lastPage.length * pages.length;
        },
      }
    );
  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
};
