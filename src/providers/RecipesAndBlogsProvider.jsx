import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
export const RecipesAndBlogsDataContext = createContext(null);
const RecipesAndBlogsProvider = ({ children }) => {
  const { isLoading: recipesLoading, data: recipes } = useQuery(
    ["approvedRecipes"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}allRecipes/approved`
      );
      return result.data;
    }
  );

  // blogs data
  const { isLoading: blogsLoading, data: blogs } = useQuery(
    ["approvedBlogs"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}allBlogs/approved`
      );
      return result.data;
    }
  );

  const recipesAndBlogsData = {
    recipes,
    blogs,
    recipesLoading,
    blogsLoading,
  };
  return (
    <RecipesAndBlogsDataContext.Provider value={recipesAndBlogsData}>
      {children}
    </RecipesAndBlogsDataContext.Provider>
  );
};

export default RecipesAndBlogsProvider;
