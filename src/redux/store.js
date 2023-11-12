import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./Slices/routeSlics";
import wishListSlice from "./Slices/wishListSlice";

import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  currentPage: pageSlice,
  wishList: wishListSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
