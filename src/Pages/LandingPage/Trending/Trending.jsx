import { useQuery } from "react-query";
import Card from "../../../Components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";

const Trending = () => {
  const [recipes, setRecipes] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setShowTitle(true);
      }

      if (currentScrollY === 0) {
        setShowTitle(false);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showTitle]);

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
      <div className="">
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className={`overflow-hidden  mb-1`}>
        <h1
          className={`text-3xl md:text-5xl text-colorOne transition-all duration-500  ${
            showTitle ? "translate-y-0 " : "translate-y-14 opacity-0"
          }`}
        >
          Trending this week
        </h1>
      </div>
      <div
        id="recipesContainer"
        className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6  gap-y-4 md:gap-y-5  "
      >
        {recipes.map((item, index) => (
          <Card itemType="recipe" item={item} key={index}></Card>
        ))}
      </div>
    </div>
  );
};

export default Trending;
