import { useQuery } from "react-query";
import Card from "../../../Components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import CardSkeleton from "../../../Components/CardSkeleton";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setShowTitle(true);
        console.log("show title");
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

  return (
    <div className=" my-container">
      <div className={`  mb-1`}>
        <h1
          className={`text-3xl md:text-5xl text-colorOne transition-all duration-500  ${
            showTitle ? "translate-y-0 " : "translate-y-14 opacity-0"
          }`}
        >
          Cook something quick
        </h1>
      </div>
      <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
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
