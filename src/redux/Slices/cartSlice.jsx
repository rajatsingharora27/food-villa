import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Enable the MapSet plugin from Immer
enableMapSet();

const cartSlice = createSlice({
  name: "cartList",
  initialState: {
    cart: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.productId;
      console.log(productId, state.cart);
      if (!state.cart.hasOwnProperty(productId)) {
        state.cart[productId] = action.payload;
      }
      console.log(productId, state.cart);
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      delete state.cart[productId];
    },
    addToCartSliceAfterLogin: (state, action) => {
      const cartItemsFromApi = action.payload;
      console.log("cart login slice");
      cartItemsFromApi.forEach((ele) => {
        console.log(ele);
        if (state.cart.hasOwnProperty(ele.productId)) {
          // if the store has save item that is alredy in list coming from db
          // replace the property with the db one
          state.cart[ele.productId] = ele;
        } else {
          state.cart[ele.productId] = ele;
        }
      });
    },
  },
});

export const { addToCart, removeCartItem, addToCartSliceAfterLogin } = cartSlice.actions;
export default cartSlice.reducer;
