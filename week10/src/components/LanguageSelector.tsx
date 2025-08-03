import type { MovieLanguage } from "../types/movie";

// 드롭다운 옵션의 타입 정의
interface LanguageOption {
  value: string;
  label: string;
}

// 컴포넌트에 전달될 props 타입 정의
interface LanguageSelectorProps {
  value: string;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
}

// 커스텀 언어 선택 드롭다운 컴포넌트
const LanguageSelector = ({
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)} // 값이 바뀌면 부모에 전달
      className={`w-full rounded-lg border border-gray-300 px-4 py-2
        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {/* 옵션 목록을 반복 렌더링 */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
