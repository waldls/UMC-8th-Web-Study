import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

// 좋아요 요청을 보내는 커스텀 훅
function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // ✅ 요청 직전에 실행됨 (Optimistic Update)
    // 실제 API 응답이 오기 전에 UI를 미리 업데이트해서 반응성을 높임
    onMutate: async (lp) => {
      // 1. 해당 게시글에 대한 기존 쿼리를 중단시킴 (중복 요청 방지)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 캐시에 저장된 게시글 데이터를 가져옴
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 3. 이전 데이터를 복사하여 새 객체 newLpPost 생성 (불변성 유지)
      const newLpPost = { ...previousLpPost };

      // 4. 현재 로그인한 사용자의 ID를 가져옴
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      // 5. 좋아요 목록에서 현재 유저의 좋아요가 있는지 확인
      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;

      // 6. 이미 좋아요를 눌렀다면 제거, 아니라면 추가
      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1); // 좋아요 취소
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike); // 좋아요 추가
      }

      console.log(newLpPost);

      // 7. 수정된 게시글 데이터를 캐시에 저장 (UI가 즉시 반영됨)
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      // 8. 이후의 에러 복구 등을 위한 이전 상태와 새로운 상태를 반환
      return { previousLpPost, newLpPost };
    },

    // ❌ 에러 발생 시 실행됨
    // optimistic update로 바뀐 캐시를 원래 상태로 되돌림
    onError: (err, newLp, context) => {
      console.log(err, newLp);

      // 캐시를 원래의 상태(previousLpPost)로 롤백
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },

    // ✅ 성공이든 실패든 무조건 마지막에 실행됨
    // 서버에서 최종 데이터를 다시 가져와서 캐시와 동기화
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;
