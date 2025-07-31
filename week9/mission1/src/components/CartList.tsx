import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";

const CartList = () => {
  // Redux store에서 cartItems 배열 가져오기
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
