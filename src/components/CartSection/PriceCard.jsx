import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";

const PriceCard = () => {
  const currentCartItems = useSelector((store) => store.cartList.cartData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    currentCartItems.forEach((ele) => {
      total += ele.quantity * ele.price;
    });

    setTotalPrice(total);
    setGst((totalPrice * 5) / 100);
    setFinalPrice(gst + totalPrice);
    // console.log(finalPrice);
  }, [currentCartItems]);

  return (
    <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-12 '>
      <div className='mb-2 flex justify-between'>
        <p className='text-gray-700'>Subtotal</p>
        <p className='text-gray-700'>₹ {totalPrice}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-gray-700'>GST</p>
        <p className='text-gray-700'>₹ {gst}</p>
      </div>
      <hr className='my-4' />
      <div className='flex justify-between'>
        <p className='text-lg font-bold'>Total</p>
        <div className=''>
          <p className='mb-1 text-lg font-bold'>₹ {gst + totalPrice}</p>
          <p className='text-sm text-gray-700'>including GST</p>
        </div>
      </div>
      {/* <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600' onClick={paymentAndUpdate}>
        Check out
      </button> */}

      <button
        className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'
        onClick={() => {
          navigate("/user-detail", { state: { gst, totalPrice } });
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default PriceCard;
