import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, checkCartUpdatedStatus } from "../../redux/Slices/cartSlice";
import ErrorPage from "../../pages/Error/ErrorPage";

const SectedItemCart = ({ props }) => {
  const [productQuantity, setProductQuantity] = useState(props.quantity);
  const currentCartItems = useSelector((store) => store.cartList.cart);
  const cartDetailsForPrice = useSelector((store) => store.cartList.cartData);
  const [totalCost, setTotalCost] = useState(0);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  };

  useEffect(() => {
    let cost = 0;
    const timer = setTimeout(() => {
      let userCartObject;
      if (!currentCartItems.hasOwnProperty(props.productId)) {
        userCartObject = {
          productId: props.productId,
          quantity: productQuantity,
          name: props.name,
          image: props.image,
          price: props.price,
          isPurchased: false,
          increase: true,
          decrease: false,
        };
      } else {
        userCartObject = {
          productId: props.productId,
          quantity: productQuantity,
          name: props.name,
          image: props.image,
          price: props.price,
          isPurchased: false,
          increase: true,
          decrease: false,
        };
      }

      // calculate total price

      dispatch(addToCart(userCartObject));
      dispatch(checkCartUpdatedStatus(true));
    }, 1000);

    setTotalCost(cost);

    let total;
    cartDetailsForPrice.forEach((ele) => {
      total = ele.quantity * ele.price;
    });

    // dispatch(totalCartPrice(total));

    return () => {
      clearTimeout(timer);
    };
  }, [productQuantity]);

  // if (Object.keys(currentCartItems).length === 0) {
  //   return <ErrorPage />;
  // }
  if (productQuantity === 0) return;

  return (
    <div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
      <img src={props.image} alt={props.name} className='w-full rounded-lg sm:w-40' />
      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className='mt-5 sm:mt-0'>
          <h2 className='text-lg font-bold text-gray-900'>{props.name}</h2>
          {/* <p className='mt-1 text-xs text-gray-700'>36EU - 4US</p> */}
        </div>
        <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
          <div className='flex items-center border-gray-100'>
            <button className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50' onClick={handleDecreaseQuantity}>
              -
            </button>
            <div className='h-8 w-8 pt-2 border bg-white text-center text-xs outline-none'>
              <span className=''>{productQuantity}</span>
            </div>
            <button className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50' onClick={handleIncreaseQuantity}>
              +
            </button>
          </div>
          <div className='flex items-center space-x-4'>
            <p className='text-sm'>₹{props.price} </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectedItemCart;
