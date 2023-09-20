import ProductCart from "../ProductCard/ProductCart";

const OtherProductSelection = () => {
  return (
    <div className=" grid  grid-cols-1  sm:grid-cols-2   md:grid-cols-4  place-items-center gap-y-14 mt-16  ">
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

export default OtherProductSelection;
