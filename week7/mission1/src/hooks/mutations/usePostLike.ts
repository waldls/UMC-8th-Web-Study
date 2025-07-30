import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

// Lp에 좋아요를 등록하는 커스텀 훅
function usePostLike() {
  return useMutation({
    // 실제 API 요청 함수 (post 요청)
    mutationFn: postLike,

    /**
     * 요청 성공 시 실행되는 콜백
     * @param data : postLike의 성공 응답 데이터
     * @param variables : mutate에 넘긴 인자 값
     * @param context : onMutate에서 리턴한 값 (낙관적 업데이트 시 사용)
     */
    onSuccess: (data, variables, context) => {
      // 좋아요 후 Lp 상세 데이터를 다시 불러오게 캐시 무효화 처리 (refetch 유도)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId], // 이 Lp에 대한 쿼리만 무효화
        exact: true,
      });
    },

    /**
     * 요청 실패 시 실행되는 콜백
     * @param error : 요청 실패 시 발생한 에러
     * @param variables : mutate에 넘긴 인자 값
     * @param context : onMutate에서 리턴한 값
     */
    onError: (error, variables, context) => {
      // 예 : 에러 로그 기록, 낙관적 업데이트 롤백 처리 등
    },

    /**
     * 요청 직전에 실행되는 콜백
     * Optimistic Update(낙관적 업데이트)를 구현할 때 사용
     * @param variables - mutate에 전달한 파라미터
     * @returns context로 onSuccess/onError에 전달 가능
     */
    onMutate: (variables) => {
      // 예 : 기존 캐시값 백업 후 optimisitc update 적용
      console.log("hi");
    },

    /**
     * 요청이 끝나고 (성공/실패 관계없이) 항상 실행되는 콜백
     * @param data - 성공 시 응답 데이터 (undefined일 수도 있음)
     * @param error - 실패 시 에러 객체 (undefined일 수도 있음)
     * @param variables - mutate에 전달한 파라미터
     * @param context - onMutate에서 반환한 값
     */
    onSettled: (data, error, variables, context) => {
      // 예 : 로딩 상태 초기화, cleanup, 에러 toast 닫기 등
    },
  });
}

export default usePostLike;
