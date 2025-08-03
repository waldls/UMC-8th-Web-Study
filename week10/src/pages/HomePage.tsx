import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import MovieFilter from "../components/MovieFilter";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";
import { useState, useMemo, useCallback } from "react";
import MovieModal from "../components/MovieModal";

export default function HomePage() {
  // 검색 필터 상태 (초기값: "어벤져스", 성인 제외, 한국어)
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  // 필터가 바뀔 때마다 axios 요청 파라미터로 반영되도록 설정 (메모이제이션)
  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  // 영화 데이터 요청  - /search/movie?query=...&language=... 등의 요청
  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  // 필터 변경 핸들러 (MovieFilter에서 전달받은 새 필터로 상태 업데이트)
  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  // 모달 상태 추가
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 영화 클릭 시 모달 열기
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* 사이트 타이틀 */}
      <h1 className="text-5xl font-extrabold text-center mb-6">
        <span
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
               bg-clip-text text-transparent animate-pulse"
        >
          MovieSite🎬
        </span>
      </h1>
      {/* 영화 필터 입력 영역 */}
      <MovieFilter onChange={handleMovieFilters} />
      {/* 로딩 중일 때 */}
      {isLoading ? (
        <div>로딩 중입니다...</div>
      ) : (
        <>
          {/* 영화 목록 출력 + 클릭 시 모달 열기 */}
          <MovieList
            movies={data?.results || []}
            onMovieClick={handleMovieClick}
          />
          {/* 영화 상세 모달 */}
          {isModalOpen && selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
}
