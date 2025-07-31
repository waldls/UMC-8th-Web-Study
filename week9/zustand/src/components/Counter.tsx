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
    <div className="flex flex-col items-center justify-center mt-10 gap-10">
      <div className="w-[280px] py-6 px-4 border border-gray-300 rounded-lg shadow-md text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">{count}</h1>
        <CounterButton />
      </div>
    </div>
  );
};

export default Counter;
