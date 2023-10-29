import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const PriceCard = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [paymentSuccess, isPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState();

  // useEffect(() => {
  //   const paymentStatusCheck = async () => {
  //     let data = {
  //       paymentSuccess,
  //       paymentId,
  //     };
  //     await axios.post("http://localhost:8080/food-villa/api/v1/payment-status", data);
  //   };
  //   paymentStatusCheck();
  // }, [paymentSuccess]);

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
          quantity: "1",
        },
        {
          productName: "Cheese cake",
          productId: "1197ae2c-bb83-4c43-b332-0b6afb195feb",
          productPrice: "2400",
          quantity: "1",
        },
      ],
    };
    const response = await axios.post("http://localhost:8080/food-villa/api/v1/place-order", data);
    console.log(response.data);
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

      handler: async (res) => {
        alert(res);
        console.log(res);
        if (res != null) {
          isPaymentSuccess(() => !paymentSuccess);
          // setPaymentId(res);
          const result = await axios.post("http://localhost:8080/food-villa/api/v1/payment-status", { payemtSuccess: true, res });
          console.log(result);
          navigate("/");
        } else {
          navigate("/about");
        }
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
