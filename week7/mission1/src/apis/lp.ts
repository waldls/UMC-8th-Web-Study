import { PaginationDto } from "../types/common";
import {
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLpListDto,
} from "../types/lp";
import { axiosInstance } from "./axios";
import { RequestLpDto } from "../types/lp";

// Lp 목록 조회
export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps/", {
    params: PaginationDto,
  });

  return data;
};

// Lp 상세 조회
export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

// 게시글 좋아요
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// 게시글 좋아요 취소
export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
