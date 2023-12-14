import { useQuery } from "react-query";
import Card from "../../../Components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const { isLoading, isError, data, error } = useQuery("recipes", async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASEURL}allRecipes`);
    return result;
  });

  useEffect(() => {
    if (data) {
      setRecipes(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className={`overflow-hidden  mb-1`}>
        <h1 className={`text-3xl md:text-5xl text-colorOne`}>
          Cook something quick
        </h1>
      </div>
      <div
        id="recipesContainer"
        className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6  gap-y-4 md:gap-y-5  "
      >
        {recipes.map((item, index) => (
          <Card
            placedIn="cookQuick"
            itemType="recipe"
            item={item}
            key={index}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
