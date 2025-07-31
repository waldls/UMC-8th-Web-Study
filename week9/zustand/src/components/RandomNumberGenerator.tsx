import { useCounterStore } from "../stores/counterStore";

const RandomNumberGenerator = () => {
  // ✅ 현재 상태의 randomNumber 값만 구독
  const randomNumber = useCounterStore((state) => state.randomNumber);
  // ✅ actions 객체에서 random 함수만 구독
  const random = useCounterStore((state) => state.actions.random);

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button onClick={random}>랜덤 번호 생성기</button>
    </div>
  );
};

export default RandomNumberGenerator;
