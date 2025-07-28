import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

// lp 목록을 커서 기반으로 무한 스크롤 방식으로 가져오는 커스텀 훅
function useGetInfiniteLpList(
  limit: number, // 한 번에 가져올 항목 개수
  search: string, // 검색어 (필터링용)
  order: PAGINATION_ORDER // 정렬 기준
) {
  return useInfiniteQuery({
    // queryFn은 페이지를 요청할 때마다 호출되는 함수임
    // pageParam은 현재 페이지 커서 (기본은 0, 이후엔 nextCursor)
    // getLpList는 API 요청 함수로, 커서 기반으로 Lp 리스트를 받아옴
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    // 쿼리 키 : 동일한 key + 파라미터 조합이면 캐싱됨
    queryKey: [QUERY_KEY.lps, search, order],

    // 최초 호출 시 사용할 초기 커서 값
    initialPageParam: 0,

    // 다음 페이지를 호출할 때 사용할 커서 반환 함수
    // 이전 페이지 응답(lastPage) 기준으로, 다음 페이지 커서를 리턴 (hasNext가 false면 undefined로 종료)
    // lastPage는 직전에 불러온 페이지의 응답
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
