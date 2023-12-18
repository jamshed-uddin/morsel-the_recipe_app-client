import { useState } from "react";
import Card from "../../Components/Card/Card";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import useRecipesBlogsData from "../../hooks/useRecipesBlogsData";

import SearchBar from "../../Components/SearchBar/SearchBar";
import AddBtn from "../../Components/AddBtn/AddBtn";

const RecipesPage = () => {
  const { recipes, recipesLoading } = useRecipesBlogsData();

  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  if (recipesLoading) {
    return (
      <div className="my-container mt-20">
        <div>
          <h1 className="uppercase text-5xl font-bold text-colorOne">
            Recipes
          </h1>
        </div>
        <div className=" grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 md:space-y-0">
          {[1, 2, 3].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-container mb-10 relative ">
      <div className="sticky top-0 left-0 right-0 z-40 pt-2 bg-bgColor md:flex">
        <h1 className="uppercase text-5xl font-bold text-colorOne w-2/3">
          Recipes
        </h1>
        <div className="flex-grow">
          <SearchBar
            data={recipes}
            searchFor={"recipe"}
            setSearchResult={setSearchResult}
            setIsSearching={setIsSearching}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-8 ">
        {isSearching ? (
          searchResult.length ? (
            searchResult.map((searchItem, index) => (
              <Card itemType="recipe" item={searchItem} key={index}></Card>
            ))
          ) : (
            <div className="text-2xl ml-1 text-colorTwo">No recipe found!</div>
          )
        ) : (
          recipes?.map((item, index) => (
            <Card itemType="recipe" item={item} key={index}></Card>
          ))
        )}
      </div>
      <AddBtn />
    </div>
  );
};

export default RecipesPage;
