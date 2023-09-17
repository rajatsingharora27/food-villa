import { FaShoppingCart } from "react-icons/fa";
const HomePageContainer = () => {
  return (
    <div className="bg-gradient-to-r from-[#44d47e] to-[#44d47e] w-full h-1/2">
      <nav className="flex justify-between items-end p-11 mb-6">
        <div className=" text-7xl  font-bold font-sans">Food Villa</div>
        <ul className=" flex gap-x-4  md:pr-[160px]">
          <li className="text-[#224F34] font-sans font-medium uppercase break-words ">
            Home
          </li>
          <li className="text-[#224F34] font-sans font-medium uppercase break-words ">
            Shop
          </li>
          <li className="text-[#224F34] font-sans font-medium uppercase break-words ">
            Contact
          </li>
          <li className="text-[#224F34] font-sans font-medium uppercase break-words ">
            About
          </li>
        </ul>
        <div>
          <div className="text">
            <FaShoppingCart />
          </div>
        </div>
      </nav>
      <div className="px-14 flex gap-x-5 mt-20">
        {/* LeftSection */}
        <div className="flex flex-col gap-y-20">
          <div className="w-full font-sans  text-[#224F34] font-bold break-words text-5xl">
            Disover Our Delecacy
          </div>
          <div className="w-full text-[#267D49] text-2xl font-sans font-medium leading-7 break-words">
            Explore our curated collection of stylish clothing and accessories
            tailored to your unique taste.
          </div>
          <button className="rounded bg-[#224F34] shadow-lg p-5 w-1/3 text-white font-medium font-sans uppercase break-words text-lg">
            Shop Now
          </button>
        </div>
        {/* RightSection */}
        <div>
          <img
            src={
              "	https://tuileriespatisserie.in/cdn/shop/files/hamper_open.png?v=1691423368"
            }
            alt=""
            className="w-full h-[90%] rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
