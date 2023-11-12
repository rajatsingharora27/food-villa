import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./Slices/routeSlics";
import wishListSlice from "./Slices/wishListSlice";

const store = configureStore({
  reducer: {
    currentPage: pageSlice,
    wishList: wishListSlice,
  },
});

export default store;
