import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./Slices/routeSlics";

const store = configureStore({
  reducer: {
    currentPage: pageSlice,
  },
});

export default store;
