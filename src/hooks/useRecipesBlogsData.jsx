import { RecipesAndBlogsDataContext } from "../providers/recipesAndBlogsProvider";

import { useContext } from "react";

const useRecipesBlogsData = () => {
  const recipesAndBlogsData = useContext(RecipesAndBlogsDataContext);

  return recipesAndBlogsData || {};
};

export default useRecipesBlogsData;

// import { DashboardDataContext } from "../providers/DashboardDataProvider";

// const useDashboardContext = () => {
//   const dashboardData = useContext(DashboardDataContext);

//   return dashboardData || {};
// };

// export default useDashboardContext;
