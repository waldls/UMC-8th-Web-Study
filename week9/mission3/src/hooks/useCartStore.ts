import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

// 장바구니 액션
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 장바구니 상태
interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;

  actions: CartActions;
}

// 장바구니 스토어 정의
export const useCartStore = create<CartState>()(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // immer를 사용하여 불변성 유지하면서 상태 업데이트
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      // 수량 증가 액션
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      // 수량 감소 액션
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      // 아이템 제거 액션
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      // 장바구니 비우기 액션
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      // 총 수량과 총 금액 계산 액션
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;
          // 각 아이템을 돌면서 수량과 금액 누적
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price); // 문자열인 경우를 대비해 Number로 변환
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

// 장바구니 상태(cartItems, amount, total)만 가져오는 커스텀 훅
export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

// 장바구니 액션만 가져오는 커스텀 훅
export const useCartActions = () => useCartStore((state) => state.actions);
