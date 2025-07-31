import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

const Counter = () => {
  // ✅ count만 사용하는 selector + useShallow 적용
  // → 다른 값이 바뀌더라도 count가 바뀌지 않으면 리렌더링 발생 안 함
  const { count } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
    }))
  );

  return (
    <div>
      <h1>{count}</h1>
      <CounterButton />
    </div>
  );
};

export default Counter;
