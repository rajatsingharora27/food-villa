import { useState } from "react";
import PageHeading from "../PageHeading";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { people } from "../../Mock/feedback";

const FeedbackMain = () => {
  const [current, setCurrent] = useState(0);
  const previousTestimony = () =>
    current > 0 ? setCurrent(current - 1) : setCurrent(people.length - 1);
  const nextTestimony = () =>
    current < people.length - 1 ? setCurrent(current + 1) : setCurrent(0);
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <PageHeading props={"Feadbacks"} />

      <div className="mx-auto py-10 px-4 w-full max-w-7xl bg-gray-50">
        <div className="relative mx-auto w-full h-full max-w-5xl flex shadow-xl">
          {/* :TESTIMONY CONTAINER */}
          <div className="z-10 relative py-10 pl-8 pr-2 w-full md:w-3/5 min-h-360px rounded md:rounded-r-none bg-green-400 bg-opacity-70 md:bg-opacity-100 text-white">
            <div className="mx-auto max-w-md flex flex-col">
              {/* ::Quote SVG */}
              <div className="flex-shrink-0">
                <svg
                  className="w-10 lg:w-12 h-10 lg:h-12"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {/* ::Testimony */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-normal">
                {people[current].testimony}
              </p>
              {/* ::Name */}
              <h3 className="mt-2 text-base font-bold">
                {people[current].name}
              </h3>
              {/* ::Role */}
              <p className="text-sm">{people[current].role}</p>
            </div>
          </div>

          {/* :PICTURE CONTAINER */}
          <div className="absolute md:relative w-full md:w-2/5 min-h-full rounded-r overflow-hidden bg-blue-600">
            <img
              src={people[current].picture}
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover filter grayscale brightness-125"
            />
          </div>

          {/* :BUTTONS */}
          <div className="z-10 absolute -bottom-5 right-1/2 md:-right-3 py-1 px-3 space-x-3 flex bg-yellow-500 text-yellow-100 transform translate-x-1/2 md:translate-x-0">
            <button
              type="button"
              aria-label="previous"
              className="flex-shrink-0 hover:text-white"
              onClick={previousTestimony}
            >
              <AiOutlineArrowLeft className="w-8" />
            </button>
            <button
              type="button"
              aria-label="next"
              className="flex-shrink-0 hover:text-white"
              onClick={nextTestimony}
            >
              <AiOutlineArrowRight className="w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackMain;
