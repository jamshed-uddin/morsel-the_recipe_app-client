import React from "react";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ItemsComp from "../BlogsPage/ItemsComp";
import Card from "../../Components/Card/Card";
import useInfiniteData from "../../hooks/useInfiniteData";
import useIntersect from "../../hooks/useIntersect";
import ErrorElement from "../../Components/ErrorElement";
import { CircularProgress } from "@mui/material";

const RecipesOfCategory = ({ recipes, recipesLoading, category }) => {
  const {
    data: recipesData,
    isLoading: recipesDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteData("/allRecipes/approved", category);

  console.log(recipesData);

  const fetchNextRecipePageHandler = (isIntersecting) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const loadMoreRecipesRef = useIntersect(fetchNextRecipePageHandler);

  if (!recipes?.length && !recipesLoading) {
    return (
      <div>
        <h1 className="text-xl font-light">{`No recipe in ${category} category`}</h1>
      </div>
    );
  }
  if (error || status === "error") {
    return <ErrorElement error={error} refetch={refetch}></ErrorElement>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 ">
        {recipesLoading
          ? [1, 2, 3].map((item, index) => <CardSkeleton key={index} />)
          : recipesData?.pages?.map((recipe, index) => (
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
    </div>
  );
};

export default RecipesOfCategory;
