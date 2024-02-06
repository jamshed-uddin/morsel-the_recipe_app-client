import { RecipesAndBlogsDataContext } from "../providers/recipesAndBlogsProvider";

import { useContext } from "react";

const useRecipesBlogsData = () => {
  const recipesAndBlogsData = useContext(RecipesAndBlogsDataContext);

  return recipesAndBlogsData || {};
};

export default useRecipesBlogsData;
