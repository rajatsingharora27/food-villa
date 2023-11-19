import { useEffect, useState } from "react";
import ProductCart from "../ProductCard/ProductCart";
import axios from "axios";
import ProductListing from "../../pages/CommonShopPage/ProductListing";

const OtherProductSelection = () => {
  const [mainPageData, setMainPageData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("In use Effect");
      const response = await axios.get(import.meta.env.VITE_REACT_APP_GET_RANDOM_PRODUCTS);
      setMainPageData(response.data.data.productDetails);
    };
    getData();
  }, []);
  return (
    <div className='grid  grid-cols-1   mt-16  '>
      <ProductListing productlist={mainPageData} />
    </div>
  );
};

export default OtherProductSelection;
