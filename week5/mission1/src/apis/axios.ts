import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// Axios 인스턴스를 생성하고, 기본 서버 주소(baseURL)를 설정함
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // .env 파일에 설정된 서버 주소 사용
});

// 요청 인터셉터로 매번 토큰 동적으로 주입
axiosInstance.interceptors.request.use((config) => {
  // LocalStorage에서 accessToken을 꺼냄
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 형태로 추가
  // replace는 토큰이 문자열 형태일 경우 "를 제거해주기 위한 처리
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
  }
  // 수정된 config를 반환해서 요청에 반영
  return config;
});
