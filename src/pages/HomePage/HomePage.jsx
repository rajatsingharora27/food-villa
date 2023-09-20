import BestSellerSection from "../../components/BestSellerSection/BestSellerSection";
import FeedbackMain from "../../components/Feedback/FeedbackMain";
import Footer1 from "../../components/Footer/Footer";
import HomePageContainer from "../../components/HomePageContainer/HomePageContainer";

import OtherProduct from "../../components/OurProductsSection/OtherProduct";

const HomePage = () => {
  return (
    <div>
      <HomePageContainer />
      <BestSellerSection />
      <OtherProduct />
      <FeedbackMain />
      <Footer1 />
    </div>
  );
};

export default HomePage;
