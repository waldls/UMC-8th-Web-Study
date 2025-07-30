import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostLike from "../hooks/mutations/usePostLike";

const LpDetailPage = () => {
  const { lpId } = useParams(); // URL에서 lpId 파라미터 추출
  const { accessToken } = useAuth(); // AuthContext에서 accessToken 가져오기

  // Lp 상세 정보 가져오기
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  // 현재 로그인한 사용자 정보 가져오기
  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate, mutateAsync } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //  .map((like) => like.userId)
  //  .includes(me?.data.id as number);
  // 현재 사용자가 해당 Lp에 좋아요를 눌렀는지 여부 확인
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  // 좋아요 등록 핸들러
  const handleLikeLp = async () => {
    likeMutate({ lpId: Number(lpId) });
  };

  // 좋아요 취소 핸들러
  const handleDislikeLp = async () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  // 로딩 중이거나 에러일 경우 빈 화면 렌더링
  if (isPending && isError) {
    return <></>;
  }

  return (
    <div className={"mt=12"}>
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>

      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
