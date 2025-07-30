import { useState, useEffect } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  // 현재 스크롤 위치(y축)를 저장할 상태값
  const [scrollY, setScrollY] = useState<number>(0);

  // handleScroll 함수에 쓰로틀링 적용
  // 스크롤 이벤트가 자주 발생해도, 2초에 한 번만 실행됨
  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY); // 현재 스크롤 위치를 상태로 저장
  }, 2000);

  // 컴포넌트가 마운트 될 때 스크롤 이벤트 리스너 등록
  // 언마운트 시엔 리스너 제거 (메모리 누수 방지)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 등록
    return () => window.removeEventListener("scroll", handleScroll); // 해제
  }, [handleScroll]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY : {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
