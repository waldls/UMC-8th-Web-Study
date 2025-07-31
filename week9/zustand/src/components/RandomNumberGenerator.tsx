import { useCounterStore } from "../stores/counterStore";

const RandomNumberGenerator = () => {
  // ✅ 현재 상태의 randomNumber 값만 구독
  const randomNumber = useCounterStore((state) => state.randomNumber);
  // ✅ actions 객체에서 random 함수만 구독
  const random = useCounterStore((state) => state.actions.random);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[280px] py-6 px-4 border border-gray-300 rounded-lg shadow-md text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          {randomNumber}
        </h1>
        <button
          onClick={random}
          className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition"
        >
          랜덤 번호 생성기
        </button>
      </div>
    </div>
  );
};

export default RandomNumberGenerator;
