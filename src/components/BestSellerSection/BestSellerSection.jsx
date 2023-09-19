import { AiOutlineArrowRight } from "react-icons/ai";
import DynamicProductDetail from "./DynamicProductDetail";
import ProductSelection from "./ProductSelection";

const BestSellerSection = () => {
  return (
    <div className="py-10 flex flex-col ">
      <DynamicProductDetail />
      <ProductSelection />
      <div className="flex items-center justify-center mt-7">
        <button className="bg-transparent w-1/6  hover:bg-green-400 text-[var(--text-color-main)] font-sans font-medium break-words hover:text-white py-2 px-4 border border-[var(--text-color-main)]  hover:border-transparent rounded">
          <div className="flex items-center justify-center gap-x-2">
            <span className="">See More</span> <AiOutlineArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default BestSellerSection;
