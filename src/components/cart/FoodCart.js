import React, { useState } from "react";
import { loadCart } from "../../utils/localStorage";

const FoodCart = () => {
  const cartItems = loadCart();
  const [items, setItems] = useState(cartItems);

  const removeFromCart = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    console.log(updatedItems);
    setItems(updatedItems);
  };

  return (
    <React.Fragment>
      {cartItems.length === 0 ? (
        <h3 className="error-title">سبد خرید شما خالی است!</h3>
      ) : (
        <div className="cart-box">
          <h2>لیست غذای های رزرو اولیه</h2>
          <table>
            <thead>
              <tr>
                <th>نام غذا</th>
                <th>وعده</th>
                <th>قیمت</th>
                <th>تاریخ رزرو</th>
                <th>ساعت</th>
                <th>تعداد</th>
                <th>حذف</th>
              </tr>
            </thead>
            {cartItems.map((item) => (
              <tbody>
                <tr key={item.id}>
                  <td>{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.foodPrice}</td>
                  <td>{item.date}</td>
                  <td>{item.hour}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {/* <i
                      className="fas fa-trash"
                      onClick={() => removeFromCart(item.id)}
                    ></i> */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default FoodCart;
