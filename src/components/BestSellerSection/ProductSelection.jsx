import ProductCart from "../ProductCard/ProductCart";

const ProductSelection = () => {
  return (
    <div className="flex justify-evenly items-center mt-10">
      {/* when using map pass the id as well */}
      <ProductCart />
      <ProductCart />
      <ProductCart />
    </div>
  );
};

export default ProductSelection;
