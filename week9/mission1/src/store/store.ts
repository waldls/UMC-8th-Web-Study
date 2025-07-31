import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 1. Redux 스토어 생성 함수
function createStore() {
  const store = configureStore({
    // 2. slice reducer들을 등록
    reducer: { cart: cartReducer },
  });

  return store;
}

// 3. 스토어 인스턴스를 생성하고 내보냄
// - 전역에서 동일한 인스턴스를 사용하기 위해 싱글톤 패턴 적용
const store = createStore();
export default store;

// 4. 타입 추론을 통해 루트 상태 및 디스패치 타입 정의
// - useSelector, useDispatch에서 타입을 명확히 하기 위해 사용

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
