import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const PriceCard = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();

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
        totalCost: 4000,
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
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
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
    <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-12 '>
      <div className='mb-2 flex justify-between'>
        <p className='text-gray-700'>Subtotal</p>
        <p className='text-gray-700'>$129.99</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-gray-700'>Shipping</p>
        <p className='text-gray-700'>$4.99</p>
      </div>
      <hr className='my-4' />
      <div className='flex justify-between'>
        <p className='text-lg font-bold'>Total</p>
        <div className=''>
          <p className='mb-1 text-lg font-bold'>$134.98 USD</p>
          <p className='text-sm text-gray-700'>including VAT</p>
        </div>
      </div>
      <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600' onClick={paymentAndUpdate}>
        Check out
      </button>
    </div>
  );
};

export default PriceCard;
