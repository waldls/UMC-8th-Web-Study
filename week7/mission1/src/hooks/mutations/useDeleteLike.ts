import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

// 좋아요 삭제 요청을 보내는 커스텀 훅
// deleteLike API를 호출하고, 성공 시 해당 Lp의 상세 데이터를 refetch 하도록 캐시를 무효화 함
function useDeleteLike() {
  return useMutation({
    // 실제 좋아요 삭제 요청을 보내는 함수 (DELETE API)
    mutationFn: deleteLike,

    // 요청이 성공했을 때 실행되는 콜백
    onSuccess: (data) => {
      /**
       * 해당 LP의 상세 데이터를 다시 불러오도록 캐시를 무효화한다
       * - queryKey: [QUERY_KEY.lps, lpId] → 이 LP의 상세 정보를 관리하는 key
       * - exact: true → 정확히 일치하는 key만 무효화 (부분 일치 무효화 방지)
       */
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default useDeleteLike;
