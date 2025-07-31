import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// 타입이 지정된 useDispatch 훅을 생성
// - Redux Toolkit의 thunk, async action 등을 쓸 수 있게 AppDispatch 타입을 적용
export const useDispatch: () => AppDispatch = useDefaultDispatch;

// 타입이 지정된 useSelector 훅을 생성
// - RootState를 자동으로 추론해서 state.cart처럼 접근할 때 타입 추론이 잘 되게 해줌
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
