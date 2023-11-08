import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      state.products.push(product);
    },
  },
});
