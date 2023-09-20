import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import PageBanner from "./PageBanner";
import ProductListing from "./ProductListing";

const ShopPage = () => {
  return (
    <div>
      <Navbar />
      <PageBanner />
      <ProductListing />
      <Footer1 />
    </div>
  );
};

export default ShopPage;
