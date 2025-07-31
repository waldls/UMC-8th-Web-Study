import { useDispatch } from "../hooks/useCustomRedux";
import { decrease, increase, removeItem } from "../slices/cartSlice";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

// 장바구니에 담긴 개별 lp 아이템을 나타내는 컴포넌트
const CartItem = ({ lp }: CartItemProps) => {
  // Redux 액션을 실행할 수 있게 해주는 함수
  const dispatch = useDispatch();

  // 수량 증가 버튼 클릭 시 호출
  const handleIncreaseCount = () => {
    dispatch(increase({ id: lp.id })); // 수량 증가
  };

  // 수량 감소 버튼 클릭 시 호출
  const handleDecreaseCount = () => {
    // 수량이 1이면 -> 감소 대신 항목 제거
    if (lp.amount === 1) {
      dispatch(removeItem({ id: lp.id }));
      return;
    }

    dispatch(decrease({ id: lp.id })); // 수량 감소
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      {/* LP 썸네일 이미지 */}
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="w-20 h-20 object-cover rounded mr-4"
      />
      {/* LP 정보 (제목, 가수, 가격) */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>
      {/* 수량 조절 버튼 영역 */}
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
