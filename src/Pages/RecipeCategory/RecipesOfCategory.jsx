import React from "react";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ItemsComp from "../BlogsPage/ItemsComp";
import Card from "../../Components/Card/Card";

const RecipesOfCategory = ({ recipes, recipesLoading, category }) => {
  if (!recipes?.length && !recipesLoading) {
    return (
      <div>
        <h1 className="text-xl font-light">{`No recipe in ${category} category`}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 ">
        {recipesLoading
          ? [1, 2, 3].map((item, index) => <CardSkeleton key={index} />)
          : recipes?.map((recipe) => (
              <Card itemType={"recipe"} item={recipe} key={recipe._id}></Card>
            ))}
      </div>
    </div>
  );
};

export default RecipesOfCategory;
