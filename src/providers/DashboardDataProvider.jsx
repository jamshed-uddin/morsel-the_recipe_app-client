import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
export const DashboardDataContext = createContext(null);
const DashboardDataProvider = ({ children }) => {
  const [usersRefetch, setUsersRefetch] = useState(false);
  const [recipesRefetch, setRecipesRefetch] = useState(false);
  const [blogsRefetch, setBlogsRefetch] = useState(false);
  const axiosSecure = useAxiosSecure();

  // users data
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
  } = useQuery(["users", usersRefetch], async () => {
    const result = await axiosSecure.get(`users`);
    return result.data;
  });

  // recipes data
  const {
    isLoading: recipesFetchLoading,
    data: recipesData,
    error: recipesFetchError,
  } = useQuery(["allRecipes", recipesRefetch], async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BASEURL}/allRecipes`
    );
    return result.data;
  });

  // blogs data
  const {
    isLoading: blogsFetchLoading,
    data: blogsData,
    error: blogsFetchError,
  } = useQuery(["allBlogs", blogsRefetch], async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}/allBlogs`);
    return result.data;
  });
  const {
    isLoading: isOverviewStateLoading,
    data: overviewStates,
    error: overviewStateFetchError,
  } = useQuery(["overviewState"], async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BASEURL}/overviewStates`
    );
    return result.data;
  });

  const dashboardData = {
    userFetchLoading,
    recipesFetchLoading,
    blogsFetchLoading,
    isOverviewStateLoading,
    userData,
    recipesData,
    blogsData,
    overviewStates,
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
