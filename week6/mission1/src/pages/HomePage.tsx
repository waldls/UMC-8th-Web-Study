import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("우즈"); // 초기값은 "우즈"
  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className={"mt-20"}>
      {/* 검색어 입력 필드 - 입력값이 변경되면 search 상태 업데이트됨 */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* lp 데이터가 있을 경우 제목을 화면에 출력 */}
      {data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
