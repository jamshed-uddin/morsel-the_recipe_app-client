import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
export const DashboardDataContext = createContext(null);
const DashboardDataProvider = ({ children }) => {
  const [usersRefetch, setUsersRefetch] = useState(false);
  const [recipesRefetch, setRecipesRefetch] = useState(false);
  const [blogsRefetch, setBlogsRefetch] = useState(false);

  // users data
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
  } = useQuery(["users", usersRefetch], async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}users`);
    return result.data;
  });

  // recipes data
  const {
    isLoading: recipesFetchLoading,
    data: recipesData,
    error: recipesFetchError,
  } = useQuery(["allRecipes", recipesRefetch], async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}allRecipes`);
    return result.data;
  });

  // blogs data
  const {
    isLoading: blogsFetchLoading,
    data: blogsData,
    error: blogsFetchError,
  } = useQuery(["allBlogs", blogsRefetch], async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}allBlogs`);
    return result.data;
  });

  // console.log(userData);

  const dashboardData = {
    userFetchLoading,
    recipesFetchLoading,
    blogsFetchLoading,
    userData,
    recipesData,
    blogsData,
    setUsersRefetch,
    setRecipesRefetch,
    setBlogsRefetch,
  };

  return (
    <DashboardDataContext.Provider value={dashboardData}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export default DashboardDataProvider;
