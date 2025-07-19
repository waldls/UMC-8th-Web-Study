import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  // 사용자 정보를 담을 상태 (초기값은 null)
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  // 처음 마운트될 때 한 번 실행
  useEffect(() => {
    const getData = async () => {
      // 서버로부터 내 정보 가져오기
      const response = await getMyInfo();
      console.log(response);
      // 받아온 데이터를 상태에 저장
      setData(response);
    };

    getData(); // 비동기 함수 실행
  }, []);

  return (
    <div>
      {/* 데이터가 있으면 이름과 이메일 출력, 없으면 로딩 메시지 */}
      {data ? (
        <>
          {data.data.name} {data.data.email}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyPage;
