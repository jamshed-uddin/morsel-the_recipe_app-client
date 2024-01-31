import Title from "../../Components/Title";
import { Link } from "react-router-dom";

import useGetCategory from "../../hooks/useGetCategory";

const AllCategories = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategory("/allCategories");

  return (
    <div className="lg:mb-8">
      <div className="mb-2 lg:mb-5">
        <Title>Recipe categories</Title>
      </div>
      <div id="category-container" className="overflow-x-auto pb-7 md:py-0">
        <div className="w-max flex flex-nowrap gap-x-6  md:gap-y-6  ">
          {categoriesLoading
            ? [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                <div
                  key={index}
                  className="w-28 lg:w-32 h-28 lg:h-32 rounded-lg  bg-slate-200 animate-pulse"
                ></div>
              ))
            : categories?.map((item) => (
                <Link key={item._id} to={`/recipes/category/${item.category}`}>
                  <div className="w-28 lg:w-32 h-28 lg:h-32 rounded-lg  relative overflow-hidden">
                    <div className="w-full h-full">
                      <img
                        className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:scale-105"
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
    </div>
  );
};

export default AllCategories;
