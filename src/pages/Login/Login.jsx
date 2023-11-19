import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToSliceWishListItemsAfterLogin } from "../../redux/Slices/wishListSlice";
import { addToCartSliceAfterLogin } from "../../redux/Slices/cartSlice";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [loader, setLoader] = useState(false);
  const wishListItemsStore = useSelector((store) => store.wishList.wishListItemsList);
  const cartItemStore = useSelector((store) => store.cartList.cart);
  const dispatch = useDispatch();

  const handlePasswordShow = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleUserSignIn = async () => {
    // check of user has something in redux store for cart or wish list
    // if yes make the object accordingly
    let wishListItemsMap = wishListItemsStore.map((ele) => {
      return { product: ele };
    });
    let cartItemList = [];
    for (const key in cartItemStore) {
      if (cartItemStore.hasOwnProperty(key)) {
        console.log(`${key}: ${cartItemStore[key]}`);
        cartItemList.push(cartItemStore[key]);
      }
    }
    const signInObject = {
      emailId: emailId,
      password: password,
      wishListItems: wishListItemsMap,
      cartItems: cartItemList,
    };
    console.log(signInObject);
    try {
      setLoader(true);
      const signInData = await axios.post("http://localhost:8080/food-villa/api/v1/sign-in", signInObject);
      setLoader(false);
      // User is present
      const signedInUserObject = signInData.data.responseData;
      console.log(signedInUserObject);
      // if successfull
      let cartItems;
      let wishListItems;
      if (signedInUserObject.cartItem !== null || signedInUserObject.cartItem !== undefined) {
        cartItems = signedInUserObject.cartItem;
        // from here only dispatch the cart item to store
        dispatch(addToCartSliceAfterLogin(cartItems));
      }
      if (signedInUserObject.wishListItem !== null || signedInUserObject.wishListItem !== undefined) {
        wishListItems = signedInUserObject.wishListItem;
        // from here only dispatch the wishlist item to store
        dispatch(addToSliceWishListItemsAfterLogin(wishListItems));
      }
      localStorage.setItem("jwt", signedInUserObject.token);
      navigate("/");
      // if some cart details are retrned the store in redux cart details
      // if some wish list is returend then store in wish list redux
      // update the cart icon number

      // return to home page
      // console.log("hello", signInData);
    } catch (ex) {
      if (Object.keys(ex.response.data.data).length == 0) {
        // make the error message common method
      }
    }
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>Get started today</h1>

        <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <div className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
          <p className='text-center text-lg font-medium'>Sign into your account</p>

          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>

            <div className='relative'>
              <input
                type='email'
                onChange={(e) => setEmailId(e.target.value)}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter email'
                value={emailId}
              />

              <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>

            <div className='relative'>
              <input
                type={type}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter password'
                value={password}
              />

              <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 text-gray-400 cursor-pointer'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  onClick={handlePasswordShow}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            className='flex justify-center items-centeritems-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white cursor-pointer'
            onClick={handleUserSignIn}
          >
            {loader && (
              <div>
                <svg aria-hidden='true' role='status' className='inline mr-3 w-4 h-4 text-white animate-spin' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  ></path>
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </div>
            )}
            Sign In
          </button>

          <p className='text-center text-sm text-gray-500 cursor-pointer '>
            No account?
            <span
              className='underline cursor-pointer'
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </p>
          <p className='text-center text-sm text-gray-500'>
            Shop without sign-up?{" "}
            <span className='underline cursor-pointer' onClick={() => navigate("/")}>
              Take me home
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
