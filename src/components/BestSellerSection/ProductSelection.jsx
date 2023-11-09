import ProductCart from "../ProductCard/ProductCart";
import StaticCard from "../StaticCard/StaticCard";

const ProductSelection = () => {
  return (
    <div className='flex justify-evenly items-center mt-10'>
      {/* when using map pass the id as well */}
      {/* <ProductCart />
      <ProductCart />
      <ProductCart /> */}
      <StaticCard />
      <StaticCard />
      <StaticCard />
    </div>
  );
};

export default ProductSelection;
