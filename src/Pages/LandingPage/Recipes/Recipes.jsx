import Card from "../../../Components/Card/Card";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";
import "./Recipes.css";
import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";

const Recipes = () => {
  const { quickRecipes, recipesLoading } = useRecipesBlogsData();

  if (recipesLoading) {
    return (
      <div className="mt-12">
        <div className={`  mb-1`}>
          <h1 className={`text-3xl md:text-5xl text-colorOne`}>
            Cook something quick
          </h1>
        </div>
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-12">
      <div className={`  mb-1`}>
        <h1 className={`text-3xl md:text-5xl text-colorOne`}>
          Cook something quick
        </h1>
      </div>
      <div
        id="recipesContainer"
        className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6  gap-y-4 md:gap-y-5  "
      >
        {quickRecipes?.slice(0, 6).map((item, index) => (
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
