import { cardImage1 } from "../../constants/imageFile";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
const ProductCart = () => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full" src={cardImage1} alt="Sunset in the mountains" />
      <div className="px-6 py-4 flex flex-col justify-center items-center pl-6 gap-y-5">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <div className="flex justify-center items-center gap-x-3">
          <AiOutlineHeart className="text-2xl " />
          <AiOutlineShoppingCart className="text-2xl " />
          <div className="flex justify-center items-center">
            <BsCurrencyRupee className="text-2xl " />{" "}
            <span className="text-2xl">3000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
