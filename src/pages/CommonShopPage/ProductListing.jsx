import { useEffect } from "react";
import ProductCart from "../../components/ProductCard/ProductCart";
import { useSelector } from "react-redux";

const ProductListing = () => {
  const path = useSelector((state) => state.currentPage.path);

  useEffect(() => {
    /**
     * Subscribe from store and call api the in use effect
     *
     * store will have the current api
     *
     * in navbar routing constants  we will store the api of backend as well
     *
     * and when navigate is called we will navigate and store in the redux
     *
     */
    console.log("Use Effect called", path);
  }, [path]);

  return (
    // flex justify-center items-center gap-x-7 p-10
    <div className=" grid grid-cols-4 place-items-center gap-y-10">
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
    </div>
  );
};

export default ProductListing;
