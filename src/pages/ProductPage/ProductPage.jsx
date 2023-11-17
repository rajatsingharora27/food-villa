import { useLocation, useParams } from "react-router-dom";
import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartSliceAfterLogin, checkCartUpdatedStatus } from "../../redux/Slices/cartSlice";

const ProductPage = () => {
  const productCompleteDetail = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCartItems = useSelector((store) => store.cartList.cart);
  const [productDetails, setProductDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(0);
  const { name, image, price } = productCompleteDetail.state.productProps;

  const handleIncreaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let userCartObject;
      if (!currentCartItems.hasOwnProperty(id)) {
        userCartObject = {
          productId: id,
          quantity: productQuantity,
          name,
          image,
          price,
          isPurchased: false,
          increase: true,
          decrease: false,
        };
      } else {
        userCartObject = {
          productId: id,
          quantity: productQuantity,
          name,
          image,
          price,
          isPurchased: false,
          increase: true,
          decrease: false,
        };
      }
      dispatch(addToCart(userCartObject));
      dispatch(checkCartUpdatedStatus(true));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [productQuantity]);

  useEffect(() => {
    const getProductDetails = async (id) => {
      const productDataFromApi = await axios.get("http://localhost:8080/food-villa/api/v1/get-product-by-id", { params: { product: id } });
      setProductDetails(productDataFromApi.data.data);

      if (currentCartItems.hasOwnProperty(id)) {
        const productFormCart = currentCartItems[id];
        setProductQuantity(productFormCart["quantity"]);
      }
      setLoading(false);
    };
    getProductDetails(id);
  }, []);

  return (
    <div>
      <Navbar />
      {loading == false ? (
        <div className='md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4'>
          <div className='xl:w-2/6 lg:w-2/5 w-80 md:block hidden'>
            <img src={`${productDetails.productImageUrl[0]}`} alt='' className='w-full h-[90%] rounded-3xl shadow-2xl' />
            {/* <img
            className="mt-6 w-full"
            alt="image of a girl posing"
            src="https://i.ibb.co/qxkRXSq/component-image-two.png"
          /> */}
          </div>

          <div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
            <div className='border-b border-gray-200 pb-6'>
              <p className='  lg:text-4xl text-xl font-semibold lg:leading-snug leading-loose text-gray-800 dark:text-white mt-2 '>{productDetails.productName}</p>
            </div>

            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
              <p className='text-3xl leading-4 text-gray-800 dark:text-gray-300'>Price</p>
              <div className='flex items-center justify-center'>
                <div className='text-3xl leading-none text-gray-600 dark:text-gray-300 mr-3'>₹{productDetails.productPrice}</div>
              </div>
            </div>

            {/* Button to increse and decrease */}

            {/* Add product details from API */}
            <div>
              <div className=' text-2xl  lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7'>
                <div>{productDetails.tagLine}</div>
                <div>&nbsp;</div>
                <div className='font-bold'>Contents:</div>
                {/* <ul>
                  <li>
                    French Hearts (Palmier Cookies:&nbsp;
                    <span data-mce-fragment='1'>2 pieces)</span>
                  </li>
                  <li>Twice baked Almond Croissant (1 piece)</li>
                  <li>
                    Twice Baked Vegetarian Savoury Croissant&nbsp;
                    <span data-mce-fragment='1'>(1 piece)</span>
                  </li>
                  <li>Oregano Crackers (100 grams)</li>
                  <li>Granola Tea cake (300 grams)</li>
                  <li>Traditional Rakhi&nbsp;(1 piece)</li>
                </ul> */}
                {productDetails.ingredients}
                <div>&nbsp;</div>
              </div>
            </div>

            <div>
              <div className='text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 '>
                <span className='text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300'>Serving instructions: &nbsp;</span>
                {productDetails.storageAndConsumption}
              </div>
              <div className='text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 '>
                <span className='text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300'>Ingredients: &nbsp;</span>
                DARK Chocolate (54%) Brown Sugar, Caster sugar, wheat flour (GLUTEN), cream , water, butter , almond powder, egg
              </div>

              <div className='text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 '>
                <span className='text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300'>Allergens: &nbsp;</span>
                Egg, Gluten, Nut, Dairy
              </div>

              <div className='text-xl font-bold leading-8 mt-7 text-gray-600 dark:text-gray-300'>For Delhi and NCR - Home delivery (Available) Self Pickup ( From Our Store)</div>
            </div>

            <div className='mt-4 flex gap-x-3 w-full'>
              <div className='flex justify-start items-center gap-x-11'>
                <button
                  className='flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/2'
                  onClick={handleDecreaseQuantity}
                >
                  <span>-</span>
                </button>
                <span className='text-3xl'>{productQuantity}</span>
                <button
                  className='flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/2'
                  onClick={handleIncreaseQuantity}
                >
                  <span>+</span>
                </button>
              </div>

              {/* <button
                type='button'
                className='flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/3'
                onClick={handleAddToCart}
              >
                <span>Add to Cart</span>
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
      <Footer1 />
    </div>
  );
};

export default ProductPage;
