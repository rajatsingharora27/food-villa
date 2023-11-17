import { useEffect, useState } from "react";
import ProductCart from "../ProductCard/ProductCart";
import axios from "axios";
import ProductListing from "../../pages/CommonShopPage/ProductListing";

const OtherProductSelection = () => {
  const [mainPageData, setMainPageData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("In use Effect");
      const response = await axios.get("http://localhost:8080/food-villa/api/v1/get-random");
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
