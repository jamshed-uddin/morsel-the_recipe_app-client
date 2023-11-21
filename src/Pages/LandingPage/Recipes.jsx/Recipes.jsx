import { useQuery } from "react-query";
import Card from "../../../Components/Card/Card";
import axios from "axios";
import { useState } from "react";
import CardSkeleton from "../../../Components/CardSkeleton";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const { isLoading, isError, data, error } = useQuery(
    "recipes",
    async () => {
      const result = axios.get(`${import.meta.env.VITE_BASEURL}allRecipes`);
      return result;
    },
    {
      onSuccess: (data) => {
        setRecipes(data.data);
      },
    }
  );
  console.log(isLoading);
  console.log(recipes);

  return (
    <div className=" my-container">
      <h1 className="text-5xl font-semibold text-colorOne mb-4">
        Cook something quick
      </h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {[1, 2, 3, 4, 5].map((el, index) =>
          isLoading ? (
            <CardSkeleton key={index} />
          ) : (
            <Card itemType="Recipe" key={index}></Card>
          )
        )}
      </div>
    </div>
  );
};

export default Recipes;
