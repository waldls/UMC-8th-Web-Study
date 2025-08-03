import type { Movie } from "../types/movie";
import fallbackImage from "../assets/no-poster.png";

// 단일 영화 카드 컴포넌트에 전달되는 props 타입
interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void; // 선택적 props로 추가
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    // 카드 전체 영역 (클릭 가능)
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
      onClick={() => onClick?.(movie)} // 이벤트 연결 (null safe)
    >
      {/* 포스터 이미지 영역 */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}` // 포스터가 있다면 해당 이미지 경로 사용
              : fallbackImage // 없으면 기본 이미지 사용
          }
          alt={`${movie.title} 포스터`}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {/* 평점 표시 (우측 상단 배지) */}
        <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
          ⭐{movie.vote_average.toFixed(1)}
        </div>
      </div>
      {/* 영화 정보 텍스트 영역 */}
      <div className="p-4">
        {/* 제목 */}
        <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
        {/* 개봉일 + 원어 */}
        <p className="text-sm text-gray-600">
          {movie.release_date} | {movie.original_language.toUpperCase()}
        </p>
        {/* 줄거리 요약 (100자 넘으면 ...으로 잘림) */}
        <p className="mt-2 text-sm text-gray-700">
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
