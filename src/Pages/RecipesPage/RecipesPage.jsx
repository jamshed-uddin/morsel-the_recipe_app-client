import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import AddBtn from "../../Components/AddBtn/AddBtn";
import useInfiniteData from "../../hooks/useInfiniteData";

import ItemsComp from "../BlogsPage/ItemsComp";
import Title from "../../Components/Title";
import useIntersect from "../../hooks/useIntersect";
import { CircularProgress } from "@mui/material";
import ErrorElement from "../../Components/ErrorElement";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipesPage.css";

const RecipesPage = () => {
  const {
    data: recipes,
    isLoading: recipesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteData("/allRecipes/approved");
  const [categories] = useState([
    "bread",
    "soup",
    "healthy",
    "breakfast",
    "cake",
    "chicken",
    "salad",
    "salmon",
    "keto",
    "quick",
    "easy",
    "other",
  ]);

  const fetchNextRecipePageHandler = (isIntersecting) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const loadMoreRecipesRef = useIntersect(fetchNextRecipePageHandler);

  if (error || status === "error") {
    return <ErrorElement error={error} refetch={refetch}></ErrorElement>;
  }

  return (
    <div className="my-container mb-10 relative ">
      <div className="mb-5">
        <div className=" mb-5">
          <Title>Recipe categories</Title>
        </div>
        <div id="category-container" className="overflow-x-auto pb-7 md:py-0">
          <div className="w-max flex flex-nowrap gap-x-6  md:gap-y-6  ">
            {categories.map((category, index) => (
              <Link key={index} to={`/recipes/category/${category}`}>
                <div className="w-28 h-28 rounded-xl border flex items-end justify-center">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Title>Explore recipes</Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 ">
        {recipesLoading
          ? [1, 2, 3].map((item, index) => <CardSkeleton key={index} />)
          : recipes?.pages.map((recipe, index) => (
              <ItemsComp itemsType={"recipes"} key={index} items={recipe} />
            ))}
      </div>
      <div ref={loadMoreRecipesRef} className="flex justify-center mt-6 ">
        {hasNextPage && (
          <div className=" h-fit w-fit">
            {isFetchingNextPage && (
              <CircularProgress sx={{ color: "#F31559" }} />
            )}
          </div>
        )}
      </div>
      <AddBtn />
    </div>
  );
};

export default RecipesPage;
