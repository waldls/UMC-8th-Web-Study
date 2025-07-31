import { useCounterActions } from "../stores/counterStore";

const CounterButton = () => {
  // const increment = useCounterStore((state) => state.actions.increment);
  // const decrement = useCounterStore((state) => state.actions.decrement);

  // ✅ 커스텀 훅으로부터 actions 객체만 구조 분해해서 가져옴
  // → 상태 분리 + 가독성 + 유지보수성이 높아짐
  const { increment, decrement } = useCounterActions();

  return (
    <div>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
  );
};

export default CounterButton;
