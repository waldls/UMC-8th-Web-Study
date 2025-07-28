import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  // 검색어 상태
  const [search, setSearch] = useState("");

  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });

  // 무한 스크롤용 lp 목록 호출 훅
  const {
    data: lps, // 전체 페이지 데이터 (pages 배열)
    isFetching, // 새로운 페이지를 가져오는 중인지 여부
    hasNextPage, // 다음 페이지 존재 여부
    isPending, // 첫 페이지 로딩 중 여부
    fetchNextPage, // 다음 페이지 요청 함수
    isError, // 에러 발생 여부
  } = useGetInfiniteLpList(5, search, PAGINATION_ORDER.dsec); // 한 페이지 당 5개 요청

  // Intersection Observer 세팅. npm install react-intersection-observer로 설치
  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있음
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0, // 요소가 1px이라도 보이면 true
  });

  // 무한 스크롤 충족 시 다음 페이지 요청
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 에러 시 메시지 출력
  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 검색 입력창 */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* lp 카드 목록 */}
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {/* 첫 로딩 시 스켈레톤 */}
        {isPending && <LpCardSkeletonList count={20} />}
        {/* 데이터가 있을 경우 lp 카드 렌더링 */}
        {lps?.pages
          ?.map((page) => page.data.data) // 각 페이지의 lp 리스트
          ?.flat() // pages를 한 배열로 평탄화
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {/* 추가 페이지 로딩 중일때 스켈레톤 */}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      {/* 👇🏻 이 div가 보이면(inView) -> 다음 페이지 요청 */}
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
