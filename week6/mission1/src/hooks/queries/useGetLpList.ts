import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

// LP 목록을 불러오는 커스텀 훅
function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    /*
      ✅ 캐싱에 사용되는 고유한 쿼리 키 (중요⭐)
        - 이 키가 동일하면 동일한 데이터를 캐시에서 재사용함
        - 검색어(search)나 정렬(order)가 바뀌면 다른 캐시로 간주
     */
    queryKey: [QUERY_KEY.lps, search, order],

    /*
      ✅ 실제 데이터를 가져오는 비동기 함수
        - 함수가 실행되어 반환하는 값이 쿼리의 결과가 됨
     */
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    /*
      ✅ staleTime (데이터 신선도 유지 시간)
      - 이 시간 동안은 데이터를 "신선한 상태"로 간주하여 refetch를 하지 않고, 캐시된 데이터를 그대로 사용함
      - 즉, 컴포넌트가 다시 마운트 되거나 포커스를 받아도 네트워크 요청 x
      - 예) 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임
     */
    staleTime: 1000 * 60 * 5, // 5분

    /*
      ✅ gcTime (Garbage Collection 시간)
      - 사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
      - staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 캐시에 보관
      - 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거함 (garbage collection)
      - 예) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 새 데이터를 받아오게 함
    */
    gcTime: 1000 * 60 * 10, // 10분

    /* 
      ✅ select: API 응답에서 필요한 데이터만 추출하는 함수
        - data.data.data 구조이므로 실제 LP 목록 배열만 추출
    */
    select: (data) => data.data.data,

    /**
     * 💡기타 유용한 옵션들 (필요 시 주석 해제)
     *
     * 📍enabled: false일 경우 쿼리를 자동 실행하지 않음 (조건부 실행에 사용)
     *    예) enabled: Boolean(search),
     *
     * 📍refetchInterval: 일정 간격으로 쿼리 자동 재실행 (실시간 데이터 polling 등)
     *    예) refetchInterval: 1000 * 60, // 1분
     *
     * 📍retry: 쿼리 실패 시 재시도 횟수 (기본값: 3회 정도, 네트워크 오류 등 임시적인 문제를 보완할 수 있음)
     *    예) retry: 3,
     *
     * 📍initialData: 쿼리 실행 전에 제공할 초기값 (컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해줌)
     *    예) initialData: initialLpListData,
     *
     * 📍keepPreviousData: 쿼리 키가 바뀌더라도 이전 데이터 유지 (파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 (Flicking)을 줄여줌 ex. 페이지네이션 UX 향상)
     *    예) keepPreviousData: true, // This keeps the previous data while fetching new data
     *
     */
  });
}

export default useGetLpList;
