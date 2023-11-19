import { useNavigate } from "react-router-dom";
import { navigation } from "../../constants/navbarNavigations";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/Slices/routeSlics";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoute = (item) => {
    //store the path value
    // api
    // url dynamic route path in the redux
    // make use effect in the common shop
    /// and subsribe there

    //  navigate first then dispatch

    // navigate("/about");
    dispatch(setCurrentPage(item));

    console.log(item);
  };

  return (
    <nav className='bg-white w-full top-0 z-20 mt-7'>
      <div className='items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex'>
        <div className='flex items-center justify-between py-3 lg:py-4 lg:block'>
          <div className=' text-3xl  font-bold font-sans uppercase cursor-pointer' onClick={() => navigate("/")}>
            Food Villa
          </div>
        </div>
        <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto`}>
          <div>
            <ul className='flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row'>
              <div className='flex gap-x-7 justify-center items-center'>
                <li className='mt-4 lg:mt-0'>
                  <div className='text'>
                    <FaShoppingCart
                      className='text-2xl cursor-pointer'
                      onClick={() => {
                        navigate("/shopping-cart");
                      }}
                    />
                  </div>
                </li>
                <li className='mt-8 lg:mt-0'>
                  <button className='py-3 px-4 text-center text-white bg-green-600 hover:bg-green-700 rounded-md shadow block lg:inline'>Sign Up</button>
                </li>
              </div>
            </ul>
          </div>
          <div className='flex-1 justify-center items-center mt-3'>
            <ul className='justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0'>
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className='text-gray-600 hover:text-green-700 cursor-pointer uppercase font-sans font-medium ' onClick={() => handleRoute(item)}>
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
