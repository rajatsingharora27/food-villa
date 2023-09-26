import PriceCard from "../../components/CartSection/PriceCard";
import SectedItemCart from "../../components/CartSection/SectedItemCart";
import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ShoppingCart = () => {
  return (
    <>
      <Navbar />
      <div className="h-max bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 ">
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart /> <SectedItemCart />
            <SectedItemCart />
            <SectedItemCart />
          </div>

          <PriceCard />
        </div>
      </div>
      <Footer1 />
    </>
  );
};

export default ShoppingCart;
