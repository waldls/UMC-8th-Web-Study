import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// 구글 로그인 후, 토큰을 받아 처리하는 리다이렉트 페이지
const GoogleLoginRedirectPage = () => {
  // accessToken을 LocalStorage에 저장할 함수
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );

  // refreshToken을 localStorage에 저장할 함수
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    // 현재 URL의 쿼리 스트링에서 파라미터를 파싱
    // 예: ?accessToken=abc&refreshToken=xyz
    const urlParams = new URLSearchParams(window.location.search);

    // accessToken과 refreshToken을 각각 쿼리에서 꺼냄
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    // accessToken이 존재하면 (즉, 로그인 성공했다면)
    if (accessToken) {
      // localStorage에 accessToken, refreshToken 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      // 마이페이지로 리다이렉 (로그인 후 화면)
      window.location.href = "/my";
    }
  }, [setAccessToken, setRefreshToken]); // 의존성 배열 (토큰 저장 함수가 바뀔 때만 재실행)

  return <div>구글 로그인 리다이렉 화면</div>;
};

export default GoogleLoginRedirectPage;
