import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 장바구니 상태의 타입 정의
export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

// 초기 상태 정의
const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// Redux Toolkit의 createSlice 사용 → 액션 + 리듀서 자동 생성
const cartSlice = createSlice({
  name: "cart", // slice 이름
  initialState, // 초기 상태

  // 리듀서 정의 : 상태 변경 로직을 작성하는 부분
  reducers: {
    // ✅ 수량 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서 전체 음반 중에 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },

    // ✅ 수량 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서 전체 음반 중에 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },

    // ✅ 특정 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
    },

    // ✅ 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },

    // ✅ 총 수량 및 총 가격 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// 액션 생성자 내보내기 (컴포넌트에서 dispatch할 때 사용)
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

// duck pattern reducer는 export default로 내보내야 함
// slice에서 생성된 reducer 내보내기
// Redux store에 등록할 때 이 reducer를 사용함
const cartReducer = cartSlice.reducer;
export default cartReducer;
