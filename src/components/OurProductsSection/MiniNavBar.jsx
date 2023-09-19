import PageHeading from "../PageHeading";

const MiniNavBar = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5">
      <PageHeading props={"Other Products"} />
      <nav>
        <ul className="flex justify-center items-center gap-x-10 text-[#454545] font-sans text-base font-medium uppercase break-words">
          <li className="hover:underline hover:transition hover:duration-400 hover:ease-in-out hover:text-green-700 cursor-pointer">
            All
          </li>
          <li className="hover:underline hover:transition hover:duration-400  hover:text-green-700 hover:ease-in-out cursor-pointer">
            Cakes
          </li>
          <li className="hover:underline hover:transition hover:duration-400   hover:text-green-700 hover:ease-in-out cursor-pointer">
            Savory
          </li>
          <li className="hover:underline hover:transition hover:duration-400  hover:text-green-700 hover:ease-in-out cursor-pointer">
            Cookies
          </li>
          <li className="hover:underline hover:transition hover:duration-400  hover:text-green-700 hover:ease-in-out cursor-pointer">
            Dry Cakes
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MiniNavBar;
