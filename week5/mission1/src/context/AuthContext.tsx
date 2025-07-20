import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto } from "../types/auth";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { postSignin, postLogout } from "../apis/auth";

// AuthContext에 담길 타입 정의
interface AuthContextType {
  accessToken: string | null; // 있을 수도 있고, 없을 수도 있으니까 string or null
  refreshToken: string | null; // 있을 수도 있고, 없을 수도 있으니까 string or null
  login: (SigninData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// AuthContext 초기값 설정
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {}, // 초기값은 빈 함수
  logout: async () => {},
});

// AuthProvider 컴포넌트 정의 (전역 상태 제공자)
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // accessToken 관련 LocalStorage 훅
  // accessToken을 LocalStorage에서 다룰 수 있도록 함수에 별칭(alias) 지정
  const {
    getItem: getAccessTokenFromStorage, // getItem → getAccessTokenFromStorage로 이름 변경
    setItem: setAccessTokenInStorage, // setItem → setAccessTokenInStorage로 이름 변경
    removeItem: removeAccessTokenFromStorage, // removeItem → removeAccessTokenFromStorage로 이름 변경
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // refreshToken 관련 LocalStorage 훅
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken을 상태로 관리 (초기값 : LocalStorage에서 가져옴)
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  // refreshToken도 상태로 관리
  const [refreshToken, setrefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // 로그인 함수
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData); // 로그인 요청

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // 토큰을 localStorage에 저장
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        // 상태 업데이트
        setAccessToken(newAccessToken);
        setrefreshToken(newRefreshToken);

        alert("로그인 성공");
        window.location.href = "/my"; // 로그인 성공 시 이동
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await postLogout(); // 서버에 로그아웃 요청
      // LocalStorage 토큰 삭제
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      // 상태 초기화
      setAccessToken(null);
      setrefreshToken(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    // context로 하위 컴포넌트에 로그인 상태 및 함수 제공
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅: context 사용 편의 제공
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Provider 없이 사용할 경우 오류 발생
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
