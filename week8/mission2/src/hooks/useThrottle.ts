import { useState, useRef, useEffect } from "react";

/**
 * useThrottle 훅
 * - value가 너무 자주 바뀔 때, 최소 delay(ms) 간격으로만 업데이트되도록 제한
 * - 성능 최적화에 유용 (ex. 스크롤, 리사이즈 이벤트 등)
 */

function useThrottle<T>(value: T, delay = 500): T {
  // 쓰로틀링된 값을 저장하는 state (초기값은 value)
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 마지막으로 값이 업데이트된 시간 저장 (ref는 값이 바뀌어도 렌더링 X)
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    // 마지막 업데이트 후 delay가 지났으면 → 즉시 업데이트
    if (Date.now() >= lastExecuted.current + delay) {
      // 현재 시간이 지난 경우
      // 현재 시각으로 lastExcuted 업데이트
      lastExecuted.current = Date.now();
      // 최신 value를 throttledValue에 저장해서 컴퍼넌트 리렌더링
      setThrottledValue(value);
    } else {
      // 아직 delay 안 지났으면 → delay 후에 한 번만 업데이트 (예약)
      const timerId = setTimeout(() => {
        // 타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신함
        lastExecuted.current = Date.now();
        // 최신 value를 throttledValue에 저장해서 컴퍼넌트 리렌더링
        setThrottledValue(value);
      }, delay);

      // CleanUp Function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
      // 기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지함
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}
export default useThrottle;
