import axios from "axios";
import React, { useCallback, useState } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { purgeStoreFun } from "../../redux/store";
import { emptyCart } from "../../redux/Slices/cartSlice";

const UserDetailForm = () => {
  const currentCartItems = useSelector((store) => store.cartList.cartData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loaction = useLocation();
  const [Razorpay] = useRazorpay();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [productInfoToList, setProductInfoToList] = useState([]);
  // const [orderID, setOrderID] = useState("");
  const [price, setFinalPrice] = useState(0);
  const [startSpinner, setStartSpinner] = useState(false);

  const validateTheInputField = () => {
    let validated = true;
    if (!name || name.length === 0) {
      toast.error("Name is required");
      validated = false;
    }
    if (!email || email.length === 0) {
      toast.error("Email Id is required");
      validated = false;
    }
    if (!phoneNumber || phoneNumber.length === 0) {
      toast.error("Phone Number is required");
      validated = false;
    }
    if (!city || city.length === 0) {
      toast.error("City is required");
      validated = false;
    }
    if (!pin || pin.length === 0) {
      toast.error("Pin is required");
      validated = false;
    }
    if (!address || address.length === 0) {
      toast.error("Address is required");
      validated = false;
    }
    // if (validated) {
    //   let list = [];
    //   currentCartItems.forEach((ele) => {
    //     let obj = {
    //       productName: ele.name,
    //       productId: ele.productId,
    //       productPrice: ele.price,
    //       quantity: ele.quantity,
    //     };
    //     list.push(obj);
    //   });
    //   setProductInfoToList(list);
    //   setFinalPrice(loaction.state.totalPrice + loaction.state.gst);
    // }
    return validated;
  };

  const handlePaymentStatus = (status, orderId, list) => {
    // console.log(status, orderId, list);
    let test = {
      userInformation: {
        userName: name,
        emailId: email,
        contactNumber: phoneNumber,
        address: address,
        pin: pin,
        extraInstructions: "",
        userId: "",
        delevirySlot: "10 AM - 5 PM",
        totalCost: loaction.state.totalPrice + loaction.state.gst,
        token: localStorage.getItem("token"),
        razorPayorderId: orderId,
      },
      cartItem: list,
    };
    const result = axios.post("http://localhost:8080/food-villa/api/v1/payment-fail", test);
    console.log(result);
  };

  // const paymentAndUpdate = async () => {
  //   const isValid = validateTheInputField();
  //   if (isValid == false) return;
  //   setStartSpinner(true);
  //   const data = {
  //     userInformation: {
  //       userName: name,
  //       emailId: email,
  //       contactNumber: phoneNumber,
  //       address: address,
  //       pin: pin,
  //       extraInstructions: "",
  //       userId: email,
  //       delevirySlot: "10 AM - 5 PM",
  //       totalCost: price,
  //       token: localStorage.getItem("token"),
  //     },
  //     cartItem: productInfoToList,
  //   };
  //   console.log(data);
  //   const response = await axios.post("http://localhost:8080/food-villa/api/v1/place-order", data);
  //   // console.log(response.data);
  //   if (response.data.isValid == false) {
  //     // update cart items
  //     return;
  //   } else {
  //     setOrderID(response.data.data.orderInitaiateDetails.id);
  //     handlePayment();
  //   }
  // };

  // const handlePayment = useCallback(async () => {
  //   const options = {
  //     key: "rzp_test_Gve1XEYDMYKP0W",
  //     amount: price,
  //     currency: "INR",
  //     name: "Food Villa",
  //     description: `${name} Order`,
  //     order_id: orderID,
  //     handler: async (res) => {
  //       // alert(res);
  //       console.log(res);
  //       const succeeded = CryptoJS.HmacSHA256(`${orderID}|${res.razorpay_payment_id}`, "qQczl8vdksUpa7LnIrKiSLu0").toString() === res.razorpay_signature;

  //       if (succeeded) {
  //         const data = {
  //           userInformation: {
  //             userName: name,
  //             emailId: email,
  //             contactNumber: phoneNumber,
  //             address: address,
  //             pin: pin,
  //             extraInstructions: "",
  //             userId: "If registered User then provide",
  //             delevirySlot: "10 AM - 5 PM",
  //             totalCost: price,
  //             token: localStorage.getItem("token"),
  //             razorPayId: res.razorpay_payment_id,
  //           },
  //           cartItem: productInfoToList,
  //         };
  //         axios.post("http://localhost:8080/food-villa/api/v1/payment-success", data);
  //         // purgeStoreFun();
  //         navigate("/");
  //       } else {
  //         handlePaymentStatus("failed", {
  //           orderID,
  //           paymentId: res.razorpay_payment_id,
  //         });
  //       }
  //     },
  //     modal: {
  //       confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
  //       // This function is executed when checkout modal is closed
  //       // There can be 3 reasons when this modal is closed.
  //       ondismiss: async (reason) => {
  //         const { reason: paymentReason, field, step, code } = reason && reason.error ? reason.error : {};
  //         // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
  //         if (reason === undefined) {
  //           // console.log("cancelled");
  //           handlePaymentStatus("Cancelled");
  //         }
  //         // Reason 2 - When modal is auto closed because of time out
  //         else if (reason === "timeout") {
  //           console.log("timedout");
  //           handlePaymentStatus("timedout");
  //         }
  //         // Reason 3 - When payment gets failed.
  //         else {
  //           // console.log("failed");
  //           handlePaymentStatus("failed", {
  //             paymentReason,
  //             field,
  //             step,
  //             code,
  //           });
  //         }
  //       },
  //     },
  //     retry: {
  //       enabled: false,
  //     },
  //     prefill: {
  //       name: name,
  //       email: email,
  //       contact: phoneNumber,
  //     },
  //     notes: {
  //       address: "Rajat's Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  //   setStartSpinner(false);
  // }, [Razorpay]);

  const razorPayPaymentStart = async () => {
    let list = [];
    if (!validateTheInputField()) return;
    else {
      currentCartItems.forEach((ele) => {
        let obj = {
          productName: ele.name,
          productId: ele.productId,
          productPrice: ele.price,
          quantity: ele.quantity,
        };
        list.push(obj);
      });
      // setProductInfoToList(list);
      setFinalPrice(loaction.state.totalPrice + loaction.state.gst);
    }
    setStartSpinner(true);
    const data = {
      userInformation: {
        userName: name,
        emailId: email,
        contactNumber: phoneNumber,
        address: address,
        pin: pin,
        extraInstructions: "",
        userId: email,
        delevirySlot: "10 AM - 5 PM",
        totalCost: loaction.state.totalPrice + loaction.state.gst,
        token: localStorage.getItem("token"),
      },
      cartItem: list,
    };
    const response = await axios.post(import.meta.env.VITE_REACT_APP_PLACE_ORDER, data);
    console.log(response);

    const options = {
      key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: response.data.data.orderInitaiateDetails.amount.toString(),
      currency: "INR",
      name: name,
      description: "Food Villa order",

      order_id: response.data.data.orderInitaiateDetails.id,
      handler: async (res) => {
        // alert(res);
        console.log(res);
        const succeeded = CryptoJS.HmacSHA256(`${res.razorpay_order_id}|${res.razorpay_payment_id}`, "qQczl8vdksUpa7LnIrKiSLu0").toString() === res.razorpay_signature;
        const data = {
          userInformation: {
            userName: name,
            emailId: email,
            contactNumber: phoneNumber,
            address: address,
            pin: pin,
            extraInstructions: "",
            userId: "If registered User then provide",
            delevirySlot: "10 AM - 5 PM",
            totalCost: price,
            token: localStorage.getItem("token"),
            razorPayId: res.razorpay_payment_id,
          },
          cartItem: list,
        };
        if (succeeded) {
          axios.post(import.meta.env.VITE_REACT_APP_PAYMENT_SUCCESS, data);
          dispatch(emptyCart());
          navigate("/");
        } else {
          const result = axios.post(import.meta.env.VITE_REACT_APP_PAYMENT_FAIL, data);
          console.log(result);
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
            handlePaymentStatus("Cancelled", response.data.data.orderInitaiateDetails.id, list);
          }
          // Reason 2 - When modal is auto closed because of time out
          else if (reason === "timeout") {
            console.log("timedout");
            handlePaymentStatus("timedout", response.data.data.orderInitaiateDetails.id, list);
          }
          // Reason 3 - When payment gets failed.
          else {
            // console.log("failed");
            handlePaymentStatus("failed", response.data.data.orderInitaiateDetails.id, list);
          }
        },
      },
      prefill: {
        name: name,
        email: email,
        contact: phoneNumber,
      },
      notes: {
        address: "Rajat's Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    setStartSpinner(false);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  console.log(name);
  return (
    <div>
      <header className='flex flex-wrap'>
        <nav className='flex w-screen justify-between bg-gray-50 text-gray-600'>
          <div className='w-full xl:px-12 py-6 px-5 flex space-x-12 items-center '>
            <div className='text-2xl font-bold cursor-pointer' onClick={() => navigate("/")}>
              Your Logo
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer />
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
            <form id='payment-form'>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>Shipping & Billing Information</h2>
                <fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Name</span>
                    <input
                      name='name'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='Try Odinsson'
                      required=''
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                    />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Email</span>
                    <input
                      name='email'
                      type='email'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='try@example.com'
                      required=''
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                  </label>

                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Phone Number</span>
                    <input
                      name='phoneNume'
                      type='number'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='999999999'
                      required=''
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      value={phoneNumber}
                    />
                  </label>

                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Address</span>
                    <input
                      name='address'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='10 Street XYZ 654'
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                    />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>City</span>
                    <input
                      name='city'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='San Francisco'
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      value={city}
                    />
                  </label>
                  <label className='inline-flex w-2/4 border-gray-200 py-3'>
                    <span className='text-right px-2'>State</span>
                    <input
                      name='state'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='CA'
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      value={state}
                    />
                  </label>
                  <label className='xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3'>
                    <span className='text-right px-2 xl:px-0 xl:text-none'>ZIP</span>
                    <input
                      name='postal_code'
                      className='focus:outline-none px-3 bg-white'
                      placeholder='98603'
                      onChange={(e) => {
                        setPin(e.target.value);
                      }}
                      value={pin}
                    />
                  </label>
                </fieldset>
              </section>
            </form>
          </div>

          <button
            className='flex justify-center items-center submit-button px-4 py-3 rounded-full bg-green-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'
            onClick={razorPayPaymentStart}
          >
            <span>Pay ₹ {loaction?.state?.totalPrice + loaction?.state?.gst}</span>
            {startSpinner ? (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  class='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span class='sr-only'>Loading...</span>
              </div>
            ) : (
              ""
            )}
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
