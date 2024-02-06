import Card from "../../../Components/Card/Card";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";
import "./Recipes.css";
import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";
import Title from "../../../Components/Title";

const Recipes = () => {
  const { quickRecipes, trendingQuickVoicesLoading } = useRecipesBlogsData();

  if (trendingQuickVoicesLoading) {
    return (
      <div className="mt-12">
        <div className={`mb-1`}>
          <Title>Cook something quick</Title>
        </div>
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-12">
      <div className={`mb-1`}>
        <Title>Cook something quick</Title>
      </div>
      <div
        id="recipesContainer"
        className=" grid  md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6  gap-y-4 md:gap-y-5  "
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
