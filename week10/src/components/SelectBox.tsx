// 체크박스(SelectBox)에 사용할 props 타입 정의
interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

// 커스텀 체크박스 컴포넌트
export const SelectBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
  className,
}: SelectBoxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
  );
};
