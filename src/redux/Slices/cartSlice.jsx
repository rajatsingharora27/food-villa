import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Enable the MapSet plugin from Immer
enableMapSet();

const cartSlice = createSlice({
  name: "cartList",
  initialState: {
    cart: {},
    cartUpdated: false,
    totalItemsInCart: 0,
    cartData: [],
    // totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.productId;
      console.log(productId, state.cart);
      if (!state.cart.hasOwnProperty(productId)) {
        state.cart[productId] = action.payload;
      } else {
        state.cart[productId] = action.payload;
      }
    },
    zeroProductQuantityCartItem: (state, action) => {
      const productId = action.payload;
      state.cart[productId].quantity = 0;
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
    checkCartUpdatedStatus: (state, action) => {
      console.log("updated status", action.payload);
      state.cartUpdated = action.payload;
    },
    removeProductFromStore: (state, action) => {
      const productId = action.payload;
      delete state.cart[productId];
    },
    cartDataToArray: (state, action) => {
      state.cartData = action.payload;
    },
    emptyCart: (state) => {
      state.cart = {};
    },

    // totalCartPrice: (state, action) => {
    //   state.totalPrice = action.payload;
    //   // let initial = 0;
    //   // for (const key in state.cart) {
    //   //   // console.log(state.cart[key].price);
    //   //   initial += state.cart[key].quantity * state.cart[key].price;
    //   //   // console.log(state.totalPrice);
    //   // }
    //   // state.totalPrice = initial;
    //   // console.log(initial);
    // },
  },
});

export const { addToCart, zeroProductQuantityCartItem, addToCartSliceAfterLogin, checkCartUpdatedStatus, removeProductFromStore, cartDataToArray, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
