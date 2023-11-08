import { cardImage1 } from "../../constants/imageFile";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCart = ({ props }) => {
  const navigate = useNavigate();

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
      <div className='px-6 py-4 flex flex-col justify-center items-center pl-6 gap-y-5 h-[10rem]'>
        <div className='font-bold text-xl mb-2'>{props.name}</div>
        <div className='flex justify-center items-center gap-x-3'>
          <AiOutlineHeart className='text-2xl cursor-pointer' />
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
