// auth 관련 타입들 import
import {
  RequestSignupDto, // 회원가입 요청 시 보내는 데이터 타입
  RequestSigninDto, // 로그인 요청 시 보내는 데이터 타입
  ResponseSignupDto, // 회원가입 응답 데이터 타입
  ResponseSigninDto, // 로그인 응답 데이터 타입
  ResponseMyInfoDto, // 내 정보 조회 응답 타입
} from "../types/auth";
import { axiosInstance } from "../apis/axios";

// 회원가입 요청
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

// 로그인 요청
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

// 로그아웃 요청
export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
