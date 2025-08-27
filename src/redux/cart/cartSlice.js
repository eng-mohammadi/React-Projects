import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const loadItems = action.payload;
      const exitingItem = state.items.find((item) => item.id === loadItems.id);
      if (exitingItem) {
        exitingItem.quantity += 1;
      } else {
        state.items.push({ ...loadItems, quantity: 1 });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
