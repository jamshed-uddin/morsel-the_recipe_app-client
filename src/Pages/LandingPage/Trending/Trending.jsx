import { useQuery } from "react-query";
import Card from "../../../Components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";
import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";

const Trending = () => {
  const [recipes, setRecipes] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const { trendingRecipes, recipesLoading } = useRecipesBlogsData();

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

  if (recipesLoading) {
    return (
      <div className="mt-12">
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className={`overflow-hidden  mb-2`}>
        <h1
          className={`text-3xl md:text-4xl  text-colorOne transition-all duration-700  ${
            showTitle ? "translate-y-0 " : "translate-y-14 opacity-0"
          }`}
        >
          Trending this week
        </h1>
      </div>
      <div
        className=" md:grid 
        md:grid-cols-2 lg:grid-cols-3 gap-x-6  gap-y-4 md:gap-y-5  space-y-2 md:space-y-0"
      >
        {trendingRecipes?.map((item, index) => (
          <Card
            placedIn="homepage"
            itemType="recipe"
            item={item}
            key={index}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Trending;
