import "react-multi-carousel/lib/styles.css";
import {
  carouselImagePrduct1,
  carouselImagePrduct2,
  carouselImagePrduct3,
} from "../constants/imageFile";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    slidetoSlide: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const carouselSlider = [
  { image: carouselImagePrduct1, title: "Gifts and Assortments" },
  {
    image: carouselImagePrduct2,
    title: "Get French Cakes Deliverd at Door Steps",
  },
  {
    image: carouselImagePrduct3,
    title: "Discover Our Creations",
  },
];
