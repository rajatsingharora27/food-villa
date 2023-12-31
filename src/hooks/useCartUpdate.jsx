import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartDataToArray, checkCartUpdatedStatus, removeProductFromStore } from "../redux/Slices/cartSlice";

export const useCartUpdate = () => {
  const dispatch = useDispatch();
  const cartUpdatedStatus = useSelector((store) => store.cartList.cartUpdated);
  const cartItems = useSelector((store) => store.cartList.cart);

  useEffect(() => {
    console.log("Use Effect For cart");
    const tokenData = localStorage.getItem("jwt");
    let cartItemForApi = [];
    let list = [];
    // console.log(cartItems);
    let timeOutId;
    if (tokenData != null) {
      // means logged in user
      for (let key in cartItems) {
        cartItemForApi.push(cartItems[key]);
      }

      const putCartItemsToDb = (cart, delay) => {
        const reqObject = {
          productToCartQuantity: cart,
          token: tokenData,
        };
        timeOutId = setTimeout(async () => {
          await axios.post(import.meta.env.VITE_REACT_APP_GET_CART_UPDATE, reqObject);
          for (let key in cartItems) {
            if (cartItems[key].quantity == 0) {
              dispatch(removeProductFromStore(key));
            }
          }
        }, delay);
      };
      putCartItemsToDb(cartItemForApi, 200);
    } else {
      for (let key in cartItems) {
        if (cartItems[key].quantity == 0) {
          dispatch(removeProductFromStore(key));
        }
      }
    }
    for (const key in cartItems) {
      list.push(cartItems[key]);
    }
    dispatch(cartDataToArray(list));
    dispatch(checkCartUpdatedStatus(false));
    return () => {
      clearTimeout(timeOutId);
    };
  }, [cartUpdatedStatus == true]);
};
