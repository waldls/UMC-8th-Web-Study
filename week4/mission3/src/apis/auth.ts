import {
  RequestSignupDto,
  RequestSigninDto,
  ResponseSignupDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
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

// 내 정보 조회 요청 (request type 없음)
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};
