import { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCard/ProductCart";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductListing = ({ productlist }) => {
  const path = useSelector((state) => state.currentPage.path);
  console.log(productlist);
  // console.log("PP", productProp);
  // const [product, setProduct] = useState([]);
  // const urlParam = useParams();
  // const [category, setCategory] = useState(urlParam.type);

  // useEffect(() => {
  //   /**
  //    * Subscribe from store and call api the in use effect
  //    *
  //    * store will have the current api
  //    *
  //    * in navbar routing constants  we will store the api of backend as well
  //    *
  //    * and when navigate is called we will navigate and store in the redux
  //    *
  //    */

  //   console.log("Use Effect called", path);
  // }, [path]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get("http://localhost:8080/food-villa/api/v1/get-product", { params: { category: urlParam.type } });
  //     setProduct(response.data.data.productDetails);
  //   };
  //   getData();
  // }, [urlParam.type]);

  return (
    // flex justify-center items-center gap-x-7 p-10
    <div className=' grid grid-cols-4 place-items-center gap-y-10'>
      {console.log(productlist)}
      {productlist != undefined && productlist.length != 0 ? (
        <>
          {productlist.map((productDetail) => {
            let productDetailProp = {
              id: productDetail.productId,
              name: productDetail.productName,
              price: productDetail.productPrice,
              image: productDetail.productImageUrl[0],
              inventory: productDetail.inventory,
            };
            return <ProductCart key={productDetail.productId} props={productDetailProp} />;
          })}
        </>
      ) : (
        <h1>LOADING</h1>
      )}

      {/* <ProductCart />
      <ProductCart />
      <ProductCart />

      <ProductCart /> */}
    </div>
  );
};

export default ProductListing;
