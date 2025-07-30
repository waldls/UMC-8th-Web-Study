import { useState, useEffect } from "react";

/**
 * useDebounce 훅
 * - value가 바뀐 후 일정 시간(delay) 동안 변화가 없을 때만 그 값을 반영함
 * - 검색창 자동완성, API 호출 최적화 등에 유용함
 */

function useDebounce<T>(value: T, delay: number) {
  // 디바운싱된 값 저장할 state
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay (ms) 후에 value를 debouncedValue로 설정
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // 다음 effect 실행 전에 이전 타이머 제거 (cleanup)
    // 값이 계속 바뀌면 타이머 초기화됨 -> 마지막 값만 반영됨
    return () => clearTimeout(handler);
  }, [value, delay]); // value나 delay가 바뀌면 다시 실행됨

  // delay 지나고 안정된 값 반환
  return debouncedValue;
}

export default useDebounce;
