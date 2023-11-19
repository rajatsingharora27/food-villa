import { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCard/ProductCart";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductListing = ({ productlist }) => {
  const path = useSelector((state) => state.currentPage.path);
  console.log("productList", productlist);

  return (
    // flex justify-center items-center gap-x-7 p-10
    <div className=' grid grid-cols-4 place-items-center gap-y-10'>
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
    </div>
  );
};

export default ProductListing;
