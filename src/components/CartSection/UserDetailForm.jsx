import React, { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const UserDetailForm = () => {
  const currentCartItems = useSelector((store) => store.cartList.cartData);
  const loaction = useLocation();
  const [Razorpay] = useRazorpay();

  const handlePaymentStatus = (status) => {
    let test = {
      userInformation: {
        userName: "rajat",
        emailId: "rajatsingharora27@gmail.com",
        contactNumber: "9078802386",
        address: "68/5339 karol bagh",
        pin: "110005",
        extraInstructions: "",
        userId: "If registered User then provide",
        delevirySlot: "10 AM - 5 PM",
        totalCost: 4000,
        token: "",
        razorPayorderId: "",
      },
      cartItem: [
        {
          productName: "Eggless Crunchy Nougat",
          productId: "884ccdcf-8e58-4518-b85c-af4b4ccd0ec9",
          productPrice: "2400",
          quantity: 1,
        },
        {
          productName: "Cheese cake",
          productId: "1197ae2c-bb83-4c43-b332-0b6afb195feb",
          productPrice: 2400,
          quantity: 1,
        },
      ],
    };
    const result = axios.post("http://localhost:8080/food-villa/api/v1/payment-fail", test);
    // console.log(result);
  };

  const paymentAndUpdate = async () => {
    const data = {
      userInformation: {
        userName: "rajat",
        emailId: "rajatsingharora27@gmail.com",
        contactNumber: "9078802386",
        address: "68/5339 karol bagh",
        pin: "110005",
        extraInstructions: "",
        userId: "If registered User then provide",
        delevirySlot: "10 AM - 5 PM",
        totalCost: finalPrice,
        token: "",
      },
      cartItem: [
        {
          productName: "Eggless Crunchy Nougat",
          productId: "884ccdcf-8e58-4518-b85c-af4b4ccd0ec9",
          productPrice: "2400",
          quantity: 1,
        },
        {
          productName: "Cheese cake",
          productId: "1197ae2c-bb83-4c43-b332-0b6afb195feb",
          productPrice: "2400",
          quantity: 1,
        },
      ],
    };
    const response = await axios.post("http://localhost:8080/food-villa/api/v1/place-order", data);
    // console.log(response.data);
    if (response.data.isValid == false) {
      // update cart items
      return;
    } else {
      handlePayment();
    }
  };

  const handlePayment = useCallback(async () => {
    const options = {
      key: "rzp_test_Gve1XEYDMYKP0W",
      amount: finalPrice,
      currency: "INR",
      name: "Food Villa",
      description: "Test Transaction",
      order_id: "order_Mutfnfj2jLLVtc",
      handler: async (res) => {
        alert(res);
        // console.log(res);
        const succeeded = CryptoJS.HmacSHA256(`order_Mutfnfj2jLLVtc|${res.razorpay_payment_id}`, "qQczl8vdksUpa7LnIrKiSLu0").toString() === res.razorpay_signature;

        if (succeeded) {
          const data = {
            userInformation: {
              userName: "rajat",
              emailId: "rajatsingharora27@gmail.com",
              contactNumber: "9078802386",
              address: "68/5339 karol bagh",
              pin: "110005",
              extraInstructions: "",
              userId: "If registered User then provide",
              delevirySlot: "10 AM - 5 PM",
              totalCost: 4000,
              token: "",
              razorPayId: res.razorpay_payment_id,
            },
            cartItem: [
              {
                productName: "Eggless Crunchy Nougat",
                productId: "884ccdcf-8e58-4518-b85c-af4b4ccd0ec9",
                productPrice: "2400",
                quantity: 1,
              },
              {
                productName: "Cheese cake",
                productId: "1197ae2c-bb83-4c43-b332-0b6afb195feb",
                productPrice: "2400",
                quantity: 1,
              },
            ],
          };
          axios.post("http://localhost:8080/food-villa/api/v1/payment-success", data);
          navigate("/");
        } else {
          handlePaymentStatus("failed", {
            orderId,
            paymentId: response.razorpay_payment_id,
          });
        }
      },
      modal: {
        confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
        // This function is executed when checkout modal is closed
        // There can be 3 reasons when this modal is closed.
        ondismiss: async (reason) => {
          const { reason: paymentReason, field, step, code } = reason && reason.error ? reason.error : {};
          // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
          if (reason === undefined) {
            // console.log("cancelled");
            handlePaymentStatus("Cancelled");
          }
          // Reason 2 - When modal is auto closed because of time out
          else if (reason === "timeout") {
            console.log("timedout");
            handlePaymentStatus("timedout");
          }
          // Reason 3 - When payment gets failed.
          else {
            // console.log("failed");
            handlePaymentStatus("failed", {
              paymentReason,
              field,
              step,
              code,
            });
          }
        },
      },
      retry: {
        enabled: false,
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div>
      <header className='flex flex-wrap'>
        <nav className='flex w-screen justify-between bg-gray-50 text-gray-600'>
          <div className='w-full xl:px-12 py-6 px-5 flex space-x-12 items-center '>
            <a className='text-2xl font-bold' href='#'>
              Your Logo
            </a>
          </div>
          <a className='flex xl:hidden items-center mr-6 hover:text-gray-900' href='#'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <span className='flex absolute -mt-5 ml-4'>
              <span className='h-3 w-3 absolute bg-pink-500 opacity-75 inline-flex rounded-full animate-ping'></span>
              <span className='h-3 w-3 relative inline-flex rounded-full bg-pink-600'></span>
            </span>
          </a>
          <a className='xl:hidden self-center mr-12 hover:text-gray-900' href='#'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </a>
        </nav>
      </header>
      <div className='h-screen grid grid-cols-3'>
        <div className='lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12'>
          <div className='mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md'>
            <div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
              <div className='text-yellow-500'>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 sm:w-5 h-6 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div className='text-sm font-medium ml-3'>Checkout</div>
            </div>
            <div className='text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4'>Complete your shipping and payment details below.</div>
            <div className='absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </div>
          </div>
          <div className='rounded-md'>
            <form id='payment-form' method='POST' action=''>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>Shipping & Billing Information</h2>
                <fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Name</span>
                    <input name='name' className='focus:outline-none px-3 bg-white' placeholder='Try Odinsson' required='' />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Email</span>
                    <input name='email' type='email' className='focus:outline-none px-3 bg-white' placeholder='try@example.com' required='' />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Address</span>
                    <input name='address' className='focus:outline-none px-3 bg-white' placeholder='10 Street XYZ 654' />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>City</span>
                    <input name='city' className='focus:outline-none px-3 bg-white' placeholder='San Francisco' />
                  </label>
                  <label className='inline-flex w-2/4 border-gray-200 py-3'>
                    <span className='text-right px-2'>State</span>
                    <input name='state' className='focus:outline-none px-3 bg-white' placeholder='CA' />
                  </label>
                  <label className='xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3'>
                    <span className='text-right px-2 xl:px-0 xl:text-none'>ZIP</span>
                    <input name='postal_code' className='focus:outline-none px-3 bg-white' placeholder='98603' />
                  </label>
                </fieldset>
              </section>
            </form>
          </div>

          <button
            className='submit-button px-4 py-3 rounded-full bg-green-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'
            onClick={paymentAndUpdate}
          >
            Pay ₹ {loaction.state.totalPrice + loaction.state.gst}
          </button>
        </div>
        <div className='col-span-1 bg-white lg:block hidden'>
          <h1 className='py-6 border-b-2 text-xl text-gray-600 px-8'>Order Summary</h1>
          <ul className='py-6 border-b space-y-6 px-8'>
            {currentCartItems.map((item) => {
              return (
                <li key={item.id} className='grid grid-cols-6 gap-2 border-b-1'>
                  <div className='col-span-1 self-center'>
                    <img src={item.image} alt='Product' className='rounded w-full' />
                  </div>
                  <div className='flex flex-col col-span-3 pt-2'>
                    <span className='text-gray-600 text-md font-semi-bold'>{item.name}</span>
                  </div>
                  <div className='col-span-2 pt-3'>
                    <div className='flex items-center space-x-2 text-sm justify-between'>
                      <span className='text-gray-400'>
                        {item.quantity}x ₹ {item.price}
                      </span>
                      <span className='text-pink-400 font-semibold inline-block'>₹ {item.quantity * item.price}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='px-8 border-b'>
            <div className='flex justify-between py-4 text-gray-600'>
              <span>Subtotal</span>
              <span className='font-semibold text-pink-500'>₹{loaction.state.totalPrice}</span>
            </div>
            <div className='flex justify-between py-4 text-gray-600'>
              <span>TAX</span>
              <span className='font-semibold text-pink-500'>{loaction.state.gst}</span>
            </div>
          </div>
          <div className='font-semibold text-xl px-8 flex justify-between py-8 text-gray-600'>
            <span>Total</span>
            <span>₹ {loaction.state.totalPrice + loaction.state.gst}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailForm;
