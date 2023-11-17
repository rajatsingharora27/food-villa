import { useDispatch, useSelector } from "react-redux";
import PriceCard from "../../components/CartSection/PriceCard";
import SectedItemCart from "../../components/CartSection/SectedItemCart";
import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { cartDataToArray } from "../../redux/Slices/cartSlice";

const ShoppingCart = () => {
  const userCartDetails = useSelector((store) => store.cartList.cart);
  const cartPagedata = useSelector((store) => store.cartList.cartData);
  const cartItems = useSelector((store) => store.cartList.cartData);
  // const dispatch = useDispatch();
  // const [cartItem, setCartItems] = useState();

  // useEffect(() => {
  //   console.log("shopping cart");
  //   let list = [];
  //   for (const key in userCartDetails) {
  //     list.push(userCartDetails[key]);
  //   }
  //   setCartItems(list);
  //   dispatch(cartDataToArray(list));
  //   console.log(cartPagedata);
  //   setCartItems(cartPagedata);
  // }, [userCartDetails]);

  useEffect(() => {
    console.log("shopping cart updated");
  }, [cartItems]);

  return (
    <>
      <Navbar />
      {cartItems != undefined && cartItems.length != 0 ? (
        <div className='h-max bg-gray-100 pt-20'>
          <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
          <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
            <div className='rounded-lg md:w-2/3 '>
              {cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    <SectedItemCart props={item} />
                  </div>
                );
              })}
            </div>
            <PriceCard />
          </div>
        </div>
      ) : (
        <h1 className='text-black'>No Items in cart Avaiable</h1>
      )}
      <Footer1 />
    </>
  );
};

export default ShoppingCart;
