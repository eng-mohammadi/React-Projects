import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div>
        <h2>سبد خرید</h2>
        {items.length === 0 ? (
          <h3>هیچ غذایی رزرو نشده است!</h3>
        ) : (
          items.map((item) => (
            <ul>
              <li>{item.foodName}</li>
              <li>{item.date}</li>
              <li>{item.foodPrice}</li>
              <li>{item.quantity}</li>
            </ul>
          ))
        )}
        <button type="button" onClick={() => dispatch(clearCart())}>
          پاک کردن
        </button>
      </div>
    </React.Fragment>
  );
};

export default Cart;
