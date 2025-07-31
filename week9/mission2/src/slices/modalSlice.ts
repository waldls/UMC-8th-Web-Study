import { createSlice } from "@reduxjs/toolkit";

// 모달 상태 타입 정의
export interface ModalState {
  isOpen: boolean;
}

// 초기 상태 설정
const initialState: ModalState = {
  isOpen: false,
};

// modalSlice 생성
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // TODO: 모달 켜기
    onModal: (state) => {
      state.isOpen = true;
    },
    // TODO: 모달 끄기
    offModal: (state) => {
      state.isOpen = false;
    },
  },
});

// 액션 생성자 내보내기 (dispatch 할 때 사용)
export const { onModal, offModal } = modalSlice.actions;

// 리듀서 내보내기 (store에 등록할 때 사용)
const modalReducer = modalSlice.reducer;
export default modalReducer;
