import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Enable the MapSet plugin from Immer
enableMapSet();

const cartSlice = createSlice({
  name: "cartList",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.productId;
      console.log("cart SLice");
      // if (!state.cart.includes(productId)) {
      state.cart.push(action.payload);
      // }
      console.log(productId, state.cart);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
