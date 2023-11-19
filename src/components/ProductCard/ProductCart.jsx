import { cardImage1 } from "../../constants/imageFile";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addWishLsit, removeFromWishList, resetRemoveFromWishListArray, wishListButtonClickedAction, addToWishListAction } from "../../redux/Slices/wishListSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, checkCartUpdatedStatus, zeroProductQuantityCartItem } from "../../redux/Slices/cartSlice";
import { FaCartPlus } from "react-icons/fa6";

const ProductCart = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishListItemsStore = useSelector((store) => store.wishList.wishListItemsList);
  const removedItemFromWishList = useSelector((store) => store.wishList.removedWishListItems);
  const currentCartItems = useSelector((store) => store.cartList.cart);

  const handleWishList = async () => {
    dispatch(addWishLsit(props.id));
    dispatch(wishListButtonClickedAction(true));
    const tokenData = localStorage.getItem("jwt");
    if (tokenData == null) {
      // toast.info("Please Log in to add to wish list");
      navigate("/login");
    }
  };

  const handleRemoveFromWishList = () => {
    dispatch(addToWishListAction(false));
    dispatch(wishListButtonClickedAction(true));
    dispatch(removeFromWishList(props.id));
  };

  const handleUserCartItem = () => {
    // if user is logged in then call the api to store in db

    // if user has added items in cart and after theat he login/signUp then call the api to backend to store the
    // cart items of that user

    // is user is not signed in just add data to redux and update the cart

    const userCartObject = {
      productId: props.id,
      quantity: 1,
      image: props.image,
      name: props.name,
      price: props.price,
      isPurchased: false,
      increase: true,
      decrease: false,
    };

    dispatch(addToCart(userCartObject));
    dispatch(checkCartUpdatedStatus(true));
  };

  const handleRemoveCartItem = () => {
    dispatch(zeroProductQuantityCartItem(props.id));
    dispatch(checkCartUpdatedStatus(true));
  };

  // useEffect(() => {
  //   const tokenData = localStorage.getItem("jwt");
  //   let userObj;
  //   if (addToWishList == false) {
  //     //means need to remove from wish list
  //     console.log(addToWishList);
  //     removedItemFromWishList;
  //     userObj = {
  //       productId: removedItemFromWishList,
  //       token: tokenData,
  //       wishlistAdd: false,
  //     };
  //   } else {
  //     userObj = {
  //       productId: wishListItemsStore,
  //       token: tokenData,
  //       wishlistAdd: true,
  //     };
  //   }

  //   updateCartItemsInDB(userObj, 3000);
  //   // dispatch(resetRemoveFromWishListArray());
  //   setAddToWihsList(true);
  //   setWishListButtonClicked(false);
  // }, [wishListButtonClicked == true]);

  // when there is change in the wishlist array in the redux update it

  return (
    <div className='w-[17rem] h-[27rem] rounded overflow-hidden shadow-lg'>
      <img
        className='w-full h-[15rem] mb-3 transition duration-300 ease-in-out hover:scale-110 cursor-pointer'
        src={props.image}
        alt={props.name}
        onClick={() => {
          navigate(`/product/${props.id}`, { state: { productProps: props } });
        }}
      />
      <ToastContainer />
      <div className='px-6 py-4 flex flex-col justify-center items-center pl-6 gap-y-5 h-[10rem]'>
        <div className='font-bold text-xl mb-2'>{props.name}</div>
        <div className='flex justify-center items-center gap-x-3'>
          {!wishListItemsStore.includes(props.id) ? (
            <AiOutlineHeart className='text-2xl cursor-pointer' onClick={handleWishList} />
          ) : (
            <AiFillHeart className='text-2xl cursor-pointer text-red-500' onClick={handleRemoveFromWishList} />
          )}
          {!currentCartItems.hasOwnProperty(props.id) ? (
            <AiOutlineShoppingCart className='text-2xl cursor-pointer' onClick={handleUserCartItem} />
          ) : (
            <FaCartPlus className='text-2xl cursor-pointer ' onClick={handleRemoveCartItem} />
          )}

          <div className='flex justify-center items-center'>
            <BsCurrencyRupee className='text-2xl' /> <span className='text-2xl'>{props.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCart.propTypes = {
  id: PropTypes.string,
};

export default ProductCart;
