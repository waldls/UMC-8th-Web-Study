import { useCounterActions } from "../stores/counterStore";

const CounterButton = () => {
  // const increment = useCounterStore((state) => state.actions.increment);
  // const decrement = useCounterStore((state) => state.actions.decrement);

  // ✅ 커스텀 훅으로부터 actions 객체만 구조 분해해서 가져옴
  // → 상태 분리 + 가독성 + 유지보수성이 높아짐
  const { increment, decrement } = useCounterActions();

  return (
    <div className="flex gap-4 justify-center">
      <button
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
        onClick={increment}
      >
        증가
      </button>
      <button
        className="px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-500 transition"
        onClick={decrement}
      >
        감소
      </button>
    </div>
  );
};

export default CounterButton;
