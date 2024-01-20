import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import AddBtn from "../../Components/AddBtn/AddBtn";
import useInfiniteData from "../../hooks/useInfiniteData";

import ItemsComp from "../BlogsPage/ItemsComp";
import Title from "../../Components/Title";
import useIntersect from "../../hooks/useIntersect";
import { CircularProgress } from "@mui/material";
import ErrorElement from "../../Components/ErrorElement";

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
      <div className="sticky top-0 left-0 right-0 z-40 pt-2 bg-bgColor md:flex">
        <Title> Recipes</Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-5">
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
