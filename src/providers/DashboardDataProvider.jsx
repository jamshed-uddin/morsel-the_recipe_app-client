import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
export const DashboardDataContext = createContext(null);
const DashboardDataProvider = ({ children }) => {
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
  } = useQuery("users", async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}users`);
    return result.data;
  });

  const {
    isLoading: recipesFetchLoading,
    data: recipesData,
    error: recipesFetchError,
  } = useQuery("allRecipes", async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}allRecipes`);
    return result.data;
  });
  const {
    isLoading: blogsFetchLoading,
    data: blogsData,
    error: blogsFetchError,
  } = useQuery("allBlogs", async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}allBlogs`);
    return result.data;
  });

  const dashboardData = {
    userFetchLoading,
    recipesFetchLoading,
    blogsFetchLoading,
    userData,
    recipesData,
    blogsData,
  };

  return (
    <DashboardDataContext.Provider value={dashboardData}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export default DashboardDataProvider;
