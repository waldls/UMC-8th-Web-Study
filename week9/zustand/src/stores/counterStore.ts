import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  random: () => void;
}

interface CounterState {
  // value
  count: number;
  randomNumber: number;

  // action
  actions: CounterActions;
}

// zustand 상태 생성 (devtools 미들웨어 적용)
export const useCounterStore = create<CounterState>()(
  devtools((set) => ({
    count: 0,
    randomNumber: 0,
    actions: {
      // count를 1 증가
      increment: () =>
        // set(partialOrUpdater, shouldReplace = false, actionName)
        set(
          (state) => ({
            count: state.count + 1,
          }),
          false,
          "increment"
        ),
      // count를 1 감소
      decrement: () =>
        set(
          (state) => ({
            count: state.count - 1,
          }),
          false,
          "decrement"
        ),
      // 0 ~ 99 사이의 랜덤 숫자 생성
      random: () => {
        set(
          () => ({ randomNumber: Math.floor(Math.random() * 100) }),
          false,
          "ranodm"
        );
      },
    },
    name: "counterStore", // devtools에서 스토어 이름으로 표시
  }))
);

// actions만 따로 꺼내 쓰는 커스텀 훅 (불필요한 리렌더링 방지)
export const useCounterActions = () =>
  useCounterStore((state) => state.actions);

/*
✅ 상태 분리 전략 (Atomic Selector)

- 상태 값(count, randomNumber)과 actions는 **개별적으로 꺼내 쓰는 것이 원칙**
- actions 객체는 한 번만 정의되므로, 참조값(reference)이 유지됨
- 따라서 컴포넌트에서 actions를 가져다 써도 **불필요한 리렌더링이 발생하지 않음**

✅ 장점
- 테스트하기 쉽고
- 재사용성 높으며
- 불필요한 리렌더링 방지

✅ 참고
- immer, persist, zustand/middleware 등 다양한 미들웨어와 함께 사용 가능
*/
