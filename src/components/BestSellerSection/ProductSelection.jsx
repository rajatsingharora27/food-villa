import ProductCart from "../ProductCard/ProductCart";

const ProductSelection = () => {
  return (
    <div className="flex justify-evenly items-center mt-10">
      <ProductCart />
      <ProductCart />
      <ProductCart />
    </div>
  );
};

export default ProductSelection;
