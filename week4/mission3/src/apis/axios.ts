import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// 공통 axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // 기본 서버 주소
  // 모든 요청에 포함될 기본 헤더 생성
  // Authorization 헤더에 accessToken을 bearer 방식으로 추가
  // 로그인된 사용자임을 서버에 인증
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});
