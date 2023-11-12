import { cardImage1 } from "../../constants/imageFile";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addWishLsit, removeFromWishList, resetRemoveFromWishListArray } from "../../redux/Slices/wishListSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductCart = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishListItemsStore = useSelector((store) => store.wishList.wishListItemsList);
  const removedItemFromWishList = useSelector((store) => store.wishList.removedWishListItems);
  const [addToWishList, setAddToWihsList] = useState(true);
  const [wishListButtonClicked, setWishListButtonClicked] = useState(false);

  const updateCartItemsInDB = (dataObj, delay) => {
    try {
      let timer;
      const tokenData = localStorage.getItem("jwt");
      clearTimeout(timer);
      if (tokenData !== null) {
        timer = setTimeout(async () => {
          await axios.post("http://localhost:8080/food-villa/api/v1/wishlist-update/", dataObj);
        }, delay);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleWishList = async () => {
    // Check if the user is signed in or not
    // check by looking for the token in the local storage
    dispatch(addWishLsit(props.id));
    setWishListButtonClicked(true);
    const tokenData = localStorage.getItem("jwt");
    if (tokenData == null) {
      // toast.info("Please Log in to add to wish list");
      navigate("/login");
    }
    // else {
    //   let productIdArrayForWishList = wishListItemsStore.map((ele) => {
    //     return ele;
    //   });
    // }
  };

  const handleRemoveFromWishList = () => {
    setAddToWihsList(false);
    setWishListButtonClicked(true);
    dispatch(removeFromWishList(props.id));
    console.log("remove", removedItemFromWishList);
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("jwt");
    let userObj;
    if (addToWishList == false) {
      //means need to remove from wish list
      console.log(addToWishList);
      removedItemFromWishList;
      userObj = {
        productId: removedItemFromWishList,
        token: tokenData,
        wishlistAdd: false,
      };
    } else {
      userObj = {
        productId: wishListItemsStore,
        token: tokenData,
        wishlistAdd: true,
      };
    }

    updateCartItemsInDB(userObj, 3000);
    // dispatch(resetRemoveFromWishListArray());
    setAddToWihsList(true);
    setWishListButtonClicked(false);
  }, [wishListButtonClicked == true]);

  // when there is change in the wishlist array in the redux update it

  return (
    <div className='w-[17rem] h-[27rem] rounded overflow-hidden shadow-lg'>
      <img
        className='w-full h-[15rem] mb-3 transition duration-300 ease-in-out hover:scale-110 cursor-pointer'
        src={props.image}
        alt='Sunset in the mountains'
        onClick={() => {
          navigate(`product/${id}`);
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
          <AiOutlineShoppingCart className='text-2xl cursor-pointer' />

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
