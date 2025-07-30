import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";

// 현재 로그인한 사용자를 가져오는 커스텀 훅
function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo], // 쿼리의 고유 키 (캐시 식별용)
    queryFn: getMyInfo, // 실제 데이터 요청 함수 (서버에서 사용자 정보 요청)
    enabled: !!accessToken, // accessToken이 없으면 요청을 보내지 않음 (조건부 요청)
  });
}

export default useGetMyInfo;
