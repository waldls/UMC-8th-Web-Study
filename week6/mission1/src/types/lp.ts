import { CursorBasedResponse } from "./common";

// 태그 객체 타입 정의
export type Tag = {
  id: number;
  name: string;
};

// 좋아요 객체 타입 정의
export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

// LP 목록 응답 타입 정의
export type ResponseLpListDto = CursorBasedResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
  }[];
}>;
