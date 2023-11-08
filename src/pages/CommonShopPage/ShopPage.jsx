import { useEffect, useState } from "react";
import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import PageBanner from "./PageBanner";
import ProductListing from "./ProductListing";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShopPage = () => {
  const [product, setProduct] = useState([]);
  const urlParam = useParams();
  // console.log(ur);
  useEffect(() => {
    const getData = async () => {
      console.log("In use Effect");
      const response = await axios.get("http://localhost:8080/food-villa/api/v1/get-product", { params: { category: urlParam.type } });
      setProduct(response.data.data.productDetails);
    };
    getData();
  }, []);
  return (
    <div>
      <Navbar />
      <PageBanner />
      <ProductListing productlist={product} />
      <Footer1 />
    </div>
  );
};

export default ShopPage;
