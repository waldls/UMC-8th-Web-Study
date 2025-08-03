import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

// MovieList 컴포넌트가 받을 props 타입 정의
interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void; // 선택적 props로 추가
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  // 영화 리스트가 비어있으면 "검색 결과 없음" 메시지 표시
  if (movies.length === 0) {
    return (
      <div className="flex h-6 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {movies.map((movie) => (
        // 각 영화를 MovieCard로 렌더링하며 클릭 핸들러도 전달
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};

export default MovieList;
