import ProductCart from "../ProductCard/ProductCart";

const OtherProductSelection = () => {
  return (
    <div className=" my-6 flex flex-col gap-y-9 ">
      <div className=" flex justify-center items-center gap-x-28 ">
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
      </div>
      <div className=" flex justify-center items-center gap-x-28 ">
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
      </div>
    </div>
  );
};

export default OtherProductSelection;
