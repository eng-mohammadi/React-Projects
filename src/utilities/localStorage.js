export const loadCart = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.log("خطا در بارگذاری سبد خرید", error);
    return null;
  }
};

export const saveCart = (cartItems) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.log("خطا در ذخیره سبد خرید", error);
    return null;
  }
};
