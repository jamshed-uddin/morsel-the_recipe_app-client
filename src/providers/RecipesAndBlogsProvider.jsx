import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
export const RecipesAndBlogsDataContext = createContext(null);
const RecipesAndBlogsProvider = ({ children }) => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);

  const { isLoading: recipesLoading, data: recipes } = useQuery(
    ["approvedRecipes"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}allRecipes`
      );
      return result.data;
    }
  );

  // blogs data
  const { isLoading: blogsLoading, data: blogs } = useQuery(
    ["approvedBlogs"],
    async () => {
      const result = await axios.get(`${import.meta.env.VITE_BASEURL}allBlogs`);
      return result.data;
    }
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
  }, [recipes]);

  const recipesAndBlogsData = {
    recipes,
    blogs,
    trendingRecipes,
    quickRecipes,
    recipesLoading,
    blogsLoading,
  };

  console.log(recipes);

  return (
    <RecipesAndBlogsDataContext.Provider value={recipesAndBlogsData}>
      {children}
    </RecipesAndBlogsDataContext.Provider>
  );
};

export default RecipesAndBlogsProvider;
