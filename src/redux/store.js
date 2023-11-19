import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./Slices/routeSlics";
import wishListSlice from "./Slices/wishListSlice";
import cartSlice from "./Slices/cartSlice";

import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistWishListReducer = persistReducer(persistConfig, wishListSlice);
// const persistCartReducer = persistReducer(persistConfig, cartSlice);

// const reducer = combineReducers({
//   wishList: persistWishListReducer,
//   cartList: persistCartReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistedStore = persistStore(store);

////////////////////////////////////////////////////////
// Without Persist
// const reducer = combineReducers({
//   currentPage: pageSlice,
//   wishList: wishListSlice,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });
///////////////////////////////////////////////////////////]

// workign without persist
// export const store = configureStore({
//   reducer: { currentPage: pageSlice, wishList: wishListSlice, cartList: cartSlice },
// });

// export default store;

///////////////////////////////////////////////////////

// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // import pageSlice from "./Slices/routeSlics";
// import wishListSlice from "./Slices/wishListSlice";
// import cartSlice from "./Slices/cartSlice";

// const persistConfig = {
//   key: "wishlist",
//   version: 1,
//   storage,
// };

// const persistConfig2 = {
//   key: "cart",
//   version: 1,
//   storage,
// };

// const reducer = combineReducers({
//   // currentPage: pageSlice,
//   wishList: persistReducer(persistConfig, wishListSlice),
//   cartList: persistReducer(persistConfig2, cartSlice),
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistedStore = persistStore(store);

const rootPersistConfig = {
  key: "root",
  storage,
};

const persistConfigWishlist = {
  key: "wishList",
  version: 1,
  storage,
};

const persistConfigCartlist = {
  key: "cartList",
  version: 1,
  storage,
};

const reducer = combineReducers({
  wishList: persistReducer(persistConfigWishlist, wishListSlice),
  cartList: persistReducer(persistConfigCartlist, cartSlice),
  currentPage: pageSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistedStore = persistStore(store);

export const purgeStoreFun = () => {
  persistedStore.purge().then(() => {
    console.log("Persisted data cleared");
  });
};
