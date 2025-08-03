// TMDB API에서 지원하는 언어 타입
export type MovieLanguage = "ko-KR" | "en-US" | "ja-JP";

// 영화 검색 필터 타입
export type MovieFilters = {
  query: string;
  include_adult: boolean;
  language: MovieLanguage;
};

// 단일 영화 정보를 나타내는 타입
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// TMDB 영화 검색 응답 타입
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
