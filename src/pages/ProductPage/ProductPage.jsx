import Footer1 from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img
            src={
              "	https://tuileriespatisserie.in/cdn/shop/files/hamper_open.png?v=1691423368"
            }
            alt=""
            className="w-full h-[90%] rounded-3xl shadow-2xl"
          />
          {/* <img
            className="mt-6 w-full"
            alt="image of a girl posing"
            src="https://i.ibb.co/qxkRXSq/component-image-two.png"
          /> */}
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <h1 className="  lg:text-4xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              Rakhi Special Box
            </h1>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-3xl leading-4 text-gray-800 dark:text-gray-300">
              Price
            </p>
            <div className="flex items-center justify-center">
              <p className="text-3xl leading-none text-gray-600 dark:text-gray-300 mr-3">
                ₹38.2
              </p>
            </div>
          </div>

          {/* Button to increse and decrease */}

          {/* Add product details from API */}
          <div>
            <p className=" text-2xl  lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
              <p>
                This Rakhi, celebrate your joyous moments of love and bond among
                siblings with a hand-crafted hamper filled with French baked
                goodies by Tuileries Patisserie.
              </p>
              <p>&nbsp;</p>
              <p>Contents of the Tuileries Rakhi Hamper:</p>
              <ul>
                <li>
                  French Hearts (Palmier Cookies:&nbsp;
                  <span data-mce-fragment="1">2 pieces)</span>
                </li>
                <li>Twice baked Almond Croissant (1 piece)</li>
                <li>
                  Twice Baked Vegetarian Savoury Croissant&nbsp;
                  <span data-mce-fragment="1">(1 piece)</span>
                </li>
                <li>Oregano Crackers (100 grams)</li>
                <li>Granola Tea cake (300 grams)</li>
                <li>Traditional Rakhi&nbsp;(1 piece)</li>
              </ul>
              <p>&nbsp;</p>
            </p>
          </div>

          <div>
            <p className="text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 ">
              <span className="text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300">
                Serving instructions: &nbsp;
              </span>
              Please do not expose the hamper to direct sunlight. Keep the
              hamper refrigerated or in a AC room. Shelf life of hamper 5-6 day
              in fridge.
            </p>
            <p className="text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 ">
              <span className="text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300">
                Ingredients: &nbsp;
              </span>
              DARK Chocolate (54%) Brown Sugar, Caster sugar, wheat flour
              (GLUTEN), cream , water, butter , almond powder, egg
            </p>

            <p className="text-xl leading-8 mt-7 text-gray-600 dark:text-gray-300 ">
              <span className="text-2xl font-bold leading-4 mt-7 text-gray-600 dark:text-gray-300">
                Allergens: &nbsp;
              </span>
              Egg, Gluten, Nut, Dairy
            </p>

            <p className="text-xl font-bold leading-8 mt-7 text-gray-600 dark:text-gray-300">
              For Delhi and NCR - Home delivery (Available) Self Pickup ( From
              Our Store)
            </p>
          </div>

          <div className="mt-4 flex gap-x-3">
            <div className="flex justify-start items-center gap-x-7">
              <button
                type="button"
                className="flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/2"
              >
                <span>-</span>
              </button>
              <span className="text-3xl">3</span>
              <button
                type="button"
                className="flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/2"
              >
                <span>+</span>
              </button>
            </div>

            <button
              type="button"
              className="flex justify-center items-center px-2.5 py-1.5 border border-transparent bg-green-400 text-lg text-white font-bold rounded-lg w-1/3"
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default ProductPage;
