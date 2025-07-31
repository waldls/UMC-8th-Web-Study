import { useSelector, useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

// 가격 정보 박스 컴포넌트
// 총 가격을 보여주고 장바구니를 초기화(비우기)하는 버튼 제공
const PriceBox = () => {
  // Redux 상태에서 cart.total 값을 가져옴 (총 가격)
  const { total } = useSelector((state) => state.cart);

  // 액션을 dispatch 하기 위한 함수 가져오기
  const dispatch = useDispatch();

  // 장바구니 초기화 버튼 클릭 시 실행되는 함수
  const handleInitionalizeCart = (): void => {
    dispatch(clearCart()); // cartSlice에서 정의한 clearCart() 액션
  };

  return (
    <div className="p-12 flex justify-between">
      {/* 장바구니 초기화 버튼 */}
      <button
        onClick={handleInitionalizeCart}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      {/* 총 가격 표시 */}
      <div>총 가격 : {total}원</div>
    </div>
  );
};

export default PriceBox;
