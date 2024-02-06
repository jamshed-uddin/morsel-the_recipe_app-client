import Title from "../../Components/Title";
import { Link } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import useGetCategory from "../../hooks/useGetCategory";
import { useRef, useState } from "react";

const AllCategories = ({ placedIn }) => {
  const categoryRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollRight, setScrollRight] = useState(8);

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategory("/allCategories");

  const handleScroll = () => {
    if (categoryRef.current && placedIn !== "categoryPage") {
      const { scrollLeft, clientWidth, scrollWidth } = categoryRef.current;

      setScrollRight(Math.floor(scrollWidth - clientWidth - scrollLeft));
      setScrollLeft(Math.floor(categoryRef.current.scrollLeft));
    }
  };

  const handleScrollByBtn = (direction) => {
    if (categoryRef.current) {
      const scrollPosition = categoryRef.current.scrollLeft;

      const newScroll =
        direction === "left" ? scrollPosition - 150 : scrollPosition + 150;

      categoryRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-4 md:mb-5 lg:mb-8 select-none">
      <div className="mb-2 lg:mb-5 flex justify-between items-center">
        <Title>Recipe categories</Title>
        {placedIn !== "categoryPage" && (
          <div className="text-colorOne text-xl font-semibold">
            <Link to={"/recipes/category"}>See all</Link>
          </div>
        )}
      </div>
      <div className="relative">
        {scrollLeft > 7 &&
          !categoriesLoading &&
          placedIn !== "categoryPage" && (
            <span
              onClick={() => handleScrollByBtn("left")}
              className={`absolute z-10 top-1/2 -translate-y-1/2 -left-2 lg:-left-4 bg-white cursor-pointer rounded-full shadow-sm shadow-slate-600`}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </span>
          )}
        <div
          ref={categoryRef}
          onScroll={handleScroll}
          id="category-container"
          className="overflow-auto "
        >
          <div
            className={`  ${
              placedIn === "categoryPage"
                ? "grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7"
                : "flex w-max flex-nowrap"
            } md:gap-x-6 gap-x-4 gap-y-4  md:gap-y-6  `}
          >
            {categoriesLoading
              ? [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                  <div
                    key={index}
                    className="w-28 lg:w-32 h-28 lg:h-32 rounded-lg  bg-slate-200 animate-pulse"
                  ></div>
                ))
              : categories?.map((item) => (
                  <Link
                    key={item._id}
                    to={`/recipes/category/${item.category}`}
                  >
                    <div className="w-28 lg:w-32 h-28 lg:h-32 rounded-lg  relative overflow-hidden">
                      <div className="w-full h-full ">
                        <img
                          className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:scale-105 pointer-events-none select-none"
                          src={item.photoURL}
                          alt={`Image of ${item.category}`}
                          draggable="false"
                        />
                      </div>
                      <div className="absolute bottom-0  text-white  w-full text-center bg-gradient-to-t from-gray-700">
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        {scrollRight > 7 &&
          !categoriesLoading &&
          placedIn !== "categoryPage" && (
            <span
              onClick={() => handleScrollByBtn("right")}
              className="absolute top-1/2 -translate-y-1/2 -right-2 lg:-right-4  shadow-sm shadow-slate-600 bg-white cursor-pointer rounded-full"
            >
              <KeyboardArrowRightOutlinedIcon />
            </span>
          )}
      </div>
    </div>
  );
};

export default AllCategories;
