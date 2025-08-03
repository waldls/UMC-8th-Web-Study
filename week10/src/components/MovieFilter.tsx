import type { MovieLanguage, MovieFilters } from "../types/movie";
import { useState, memo } from "react";
import { Input } from "../components/Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

// 부모(Homepage)로부터 필터 변경 시 호출할 콜백 props 전달
interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  // '검색하기' 버튼 클릭 시 필터 객체 생성 후 부모로 전달
  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters); // 컴포넌트에 필터 전달
  };

  return (
    <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl mb-10">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        {/* 영화 제목 입력 */}
        <div className="w-full sm:flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            🎬영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        {/* 성인 콘텐츠 체크박스 */}
        <div className="w-full sm:flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            ⚙️옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 언어 선택 */}
        <div className="w-full sm:flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            🌐언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 검색 버튼 */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
           hover:brightness-110 text-white font-semibold py-2 px-4 rounded 
           flex items-center gap-2 shadow transform hover:scale-105 
           transition-transform duration-200"
          >
            검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

// props가 바뀌지 않으면 리렌더링 x
export default memo(MovieFilter);
