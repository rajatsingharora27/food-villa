import BestSellerSection from "../../components/BestSellerSection/BestSellerSection";
import FeedbackMain from "../../components/Feedback/FeedbackMain";
import HomePageContainer from "../../components/HomePageContainer/HomePageContainer";
import OtherProduct from "../../components/OurProductsSection/OtherProduct";

const HomePage = () => {
  return (
    <div>
      <HomePageContainer />
      <BestSellerSection />
      <OtherProduct />
      <FeedbackMain />
    </div>
  );
};

export default HomePage;
