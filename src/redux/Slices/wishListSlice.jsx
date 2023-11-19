import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Enable the MapSet plugin from Immer
enableMapSet();

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishListItemsList: [],
    removedWishListItems: [],
    wishListButtonClickedReduxStore: false,
    addToWishListReduxStore: true,
  },
  reducers: {
    addWishLsit: (state, action) => {
      console.log("REDUX");
      state.wishListItemsList.push(action.payload);
    },
    addToSliceWishListItemsAfterLogin: (state, action) => {
      const userWishList = action.payload;
      console.log(userWishList);
      userWishList.forEach((ele) => {
        if (!state.wishListItemsList.includes(ele)) {
          state.wishListItemsList.push(ele);
        }
      });
      console.log(state.wishListItemsList);
    },
    removeFromWishList: (state, action) => {
      if (!state.removedWishListItems.includes(action.payload)) {
        state.removedWishListItems.push(action.payload);
      }

      state.wishListItemsList = state.wishListItemsList.filter((ele) => ele !== action.payload);
      console.log(state.removedWishListItems);
    },
    resetRemoveFromWishListArray: (state, action) => {
      state.removedWishListItems = [];
    },
    checkLoggedInUser: (state) => {
      state.wishListItemsList = [];
    },
    wishListButtonClickedAction: (state, action) => {
      console.log(action.payload);
      state.wishListButtonClickedReduxStore = action.payload;
      console.log(state.wishListButtonClickedReduxStore);
    },
    addToWishListAction: (state, action) => {
      state.addToWishListReduxStore = action.payload;
    },
  },
});

export const {
  addWishLsit,
  removeFromWishList,
  resetRemoveFromWishListArray,
  addToSliceWishListItemsAfterLogin,
  wishListButtonClickedAction,
  checkLoggedInUser,
  addToWishListAction,
} = wishListSlice.actions;

export default wishListSlice.reducer;
