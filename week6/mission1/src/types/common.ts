import { PAGINATION_ORDER } from "../enums/common";

// 모든 API 응답에 공통적으로 사용되는 응답 타입
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// 커서 기반 페이지네이션 응답 타입
// 무한 스크롤 또는 커서 기반 로딩에 적합
export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

// 커서 기반 페이지네이션 요청 시 사용되는 DTO
// 서버에 보낼 쿼리 파라미터 타입 정의
export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};
