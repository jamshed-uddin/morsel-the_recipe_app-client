import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import useAuthContext from "../hooks/useAuthContext";
export const RecipesAndBlogsDataContext = createContext(null);
const RecipesAndBlogsProvider = ({ children }) => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);
  const { user } = useAuthContext();
  const [unreadAvailable, setUnreadAvailable] = useState();

  const { isLoading: recipesLoading, data: recipes } = useQuery(
    ["approvedRecipes"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/allRecipes/approved`
      );
      return result.data;
    }
  );

  // blogs data
  const { isLoading: blogsLoading, data: blogs } = useQuery(
    ["approvedBlogs"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/allBlogs/approved`
      );
      return result.data;
    }
  );
  // notifications
  const {
    isLoading: notificationsLoading,
    refetch: notificationRefetch,
    data: notifications,
  } = useQuery(
    ["notifications"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/myNotifications/${user?.email}`
      );
      return result.data;
    },
    { enabled: !!user }
  );

  useEffect(() => {
    // fil
    const recentRecipes = recipes?.filter((recipe) => {
      const timeDifference = new Date() - new Date(recipe.createdAt);
      const differenceInDays = parseInt(timeDifference / (1000 * 60 * 60 * 24));

      return differenceInDays <= 7;
    });

    const sortedTrendingRecipes = recentRecipes?.sort(
      (a, b) => b.likedBy?.length - a.likedBy?.length
    );
    setTrendingRecipes(sortedTrendingRecipes?.slice(0, 3));

    // filtering for quick and easy recipes
    const filteredQuickRecipes = recipes?.filter((recipe) => {
      return recipe.ingredients.length <= 7 || recipe.prepTime.minutes <= 20;
    });
    setQuickRecipes(filteredQuickRecipes?.slice(0, 6));

    notifications?.find((notifi) => {
      if (notifi.read === false) {
        return setUnreadAvailable(true);
      } else {
        setUnreadAvailable(false);
      }
    });
  }, [recipes, notifications]);

  const recipesAndBlogsData = {
    recipes,
    blogs,
    notifications,
    trendingRecipes: trendingRecipes || recipes,
    quickRecipes,
    recipesLoading,
    blogsLoading,
    notificationsLoading,
    unreadAvailable,
    setUnreadAvailable,
    notificationRefetch,
  };

  return (
    <RecipesAndBlogsDataContext.Provider value={recipesAndBlogsData}>
      {children}
    </RecipesAndBlogsDataContext.Provider>
  );
};

export default RecipesAndBlogsProvider;
