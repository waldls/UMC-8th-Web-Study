import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto } from "../../types/lp";
import { getLpDetail } from "../../apis/lp";

// Lp 상세 정보를 가져오는 커스텀 훅
function useGetLpDetail({ lpId }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId], // 동일한 lpId에 대해 중복 요청 방지
    queryFn: () => getLpDetail({ lpId }), // 실제 데이터를 가져오는 비동기 함수
  });
}

export default useGetLpDetail;
