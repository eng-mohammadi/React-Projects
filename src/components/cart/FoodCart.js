import React, { useState } from "react";
import { loadCart, saveCart } from "../../utils/localStorage";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import Footer from "../footer/Footer";
import {
  decreaseCounter,
  constantCounter,
} from "../../redux/counter/counterActions";
import { useDispatch } from "react-redux";

const FoodCart = () => {
  const initialCart = loadCart();
  const [items, setItems] = useState(initialCart);
  const dispatch = useDispatch();

  // const removeFromCart = (id) => {
  //   const existingItemIndex = items.findIndex((item) => item.id === id);
  //   if (existingItemIndex !== -1) {
  //     const updatedCartItems = items
  //       .map((item, index) =>
  //         index === existingItemIndex
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //       .filter((item) => item.quantity > 0);
  //     saveCart(updatedCartItems);
  //     setItems(updatedCartItems);
  //     dispatch(constantCounter());
  //     dispatch(decreaseCounter());
  //   }
  // };

  const removeFromCart = (id) => {
    setItems((prevItems) => {
      // پیدا کردن آیتم هدف
      const existingItem = prevItems.find((item) => item.id === id);
      if (!existingItem) return prevItems; // اگر نیست، تغییری ندهیم

      let newItems;
      if (existingItem.quantity > 1) {
        // فقط تعداد را کم کنیم
        newItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        dispatch(constantCounter());
      } else {
        // اگر فقط یک عدد باقیست، آیتم را حذف کنیم
        newItems = prevItems.filter((item) => item.id !== id);
        dispatch(decreaseCounter());
      }

      saveCart(newItems);
      return newItems;
    });
  };

  return (
    <React.Fragment>
      <NavbarMenu />
      {items.length === 0 ? (
        <h3 className="error-title">غذایی رزرو نشده است!</h3>
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
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.foodPrice}</td>
                  <td>{item.date}</td>
                  <td>{item.hour}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <i
                      className="fas fa-trash"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default FoodCart;
