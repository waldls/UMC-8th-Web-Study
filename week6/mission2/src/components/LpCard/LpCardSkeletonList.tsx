import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

// LpCardSkeleton을 count만큼 반복 렌더링 해주는 리스트 컴포넌트
const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {/* count만큼 0으로 채운 배열을 만든 뒤 map으로 렌더링 */}
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
