import { FaShoppingCart } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { purgeStoreFun } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HomePageContainer = () => {
  const navigate = useNavigate();
  const totalCartItems = useSelector((store) => store.cartList.cart);
  const [showuserData, setShowUserData] = useState(false);

  useEffect(() => {
    const tokenData = localStorage.getItem("jwt");
    if (tokenData != null) {
      setShowUserData(true);
    }
  });

  const handlePurge = () => {
    purgeStoreFun();
  };

  return (
    <div className='bg-gradient-to-r from-[#8cf1b5] to-[#8cf1b5] w-full h-1/2 rounded-b-[5rem] shadow-2xl shadow-slate-300'>
      <nav className='flex justify-between items-end p-11 mb-6'>
        <div className=' text-7xl  font-bold font-sans uppercase'>Food Villa</div>
        <ul className=' flex gap-x-4  md:pr-[160px]'>
          <li className='text-[var(--text-color-main)] font-sans font-bold uppercase break-words cursor-pointer' onClick={() => navigate("/")}>
            Home
          </li>
          <li className='text-[var(--text-color-main)] font-sans font-bold uppercase break-words cursor-pointer ' onClick={() => navigate("/shop/all")}>
            Shop
          </li>
          <li className='text-[var(--text-color-main)]  font-sans font-bold uppercase break-words cursor-pointer '>Contact</li>
          <li className='text-[var(--text-color-main)]  font-sans font-bold uppercase break-words cursor-pointer'>About</li>
        </ul>
        <div>
          <div className='text'></div>

          <div className=' flex items-center justify-between'>
            <div className='relative  text-white p-2 rounded text-lg font-bold overflow-visible cursor-pointer'>
              {showuserData ? (
                <details className='dropdown'>
                  <summary className='m-1 btn'>open or close</summary>
                  <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
                    <li>
                      <span>Wish List</span>
                    </li>
                    <li>
                      <span>Logout</span>
                    </li>
                  </ul>
                </details>
              ) : (
                <RiLoginCircleFill
                  className='text-3xl'
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              )}
            </div>
            <div className='relative  text-white p-2 rounded text-lg font-bold overflow-visible cursor-pointer'>
              <FaShoppingCart
                className='text-3xl'
                onClick={() => {
                  navigate("/shopping-cart");
                }}
              />
              {/* <button onClick={handlePurge}>Purge</button> */}
              <div className='absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-red-500 rounded-full'>{Object.keys(totalCartItems).length}</div>
            </div>
          </div>
        </div>
      </nav>
      <div className='px-14 flex gap-x-5 mt-20'>
        {/* LeftSection */}
        <div className='flex flex-col gap-y-20'>
          <div className='w-full font-sans  text-[var(--text-color-main)] font-bold break-words text-5xl'>Disover Our Delecacy</div>
          <div className='w-full text-[var(--text-color-main)]  text-2xl font-sans font-medium leading-7 break-words'>
            Explore our curated collection of stylish clothing and accessories tailored to your unique taste.
          </div>
          <button className='rounded bg-[#224F34] shadow-lg p-5 w-1/3 text-white font-medium font-sans uppercase break-words text-lg hover:bg-green-600'>Shop Now</button>
        </div>
        {/* RightSection */}
        <div>
          <img src={"	https://tuileriespatisserie.in/cdn/shop/files/hamper_open.png?v=1691423368"} alt='' className='w-full h-[90%] rounded-3xl shadow-2xl' />
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
