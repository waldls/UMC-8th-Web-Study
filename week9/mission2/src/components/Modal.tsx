import { useDispatch } from "../hooks/useCustomRedux";
import { offModal } from "../slices/modalSlice";

interface ModalProps {
  onClearCart: () => void; // 장바구니 비우기 함수
}

// 삭제 확인 모달 컴포넌트
const Modal = ({ onClearCart }: ModalProps) => {
  const dispatch = useDispatch();

  // 아니요 버튼 클릭 -> 모달 닫기만 수행
  const handleOff = () => {
    dispatch(offModal());
  };

  // 네 버튼 클릭 -> 장바구니 비우기 후 모달 닫기
  const handleOn = () => {
    onClearCart();
    dispatch(offModal());
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl px-10 py-8 w-[340px] sm:w-[420px] text-center">
        {/* 메시지 텍스트 */}
        <p className="mb-8 text-lg sm:text-xl text-gray-700 font-semibold">
          정말 삭제하시겠습니까?
        </p>
        {/* 버튼 영역 */}
        <div className="flex justify-center gap-5">
          <button
            onClick={handleOff}
            className="w-24 py-2 rounded-md bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition-all duration-200"
          >
            아니요
          </button>
          <button
            onClick={handleOn}
            className="w-24 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-200"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
