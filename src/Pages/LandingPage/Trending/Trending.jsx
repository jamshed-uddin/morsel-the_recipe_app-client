import Card from "../../../Components/Card/Card";
import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";
import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";
import Title from "../../../Components/Title";

const Trending = () => {
  const { trendingRecipes, trendingQuickVoicesLoading } = useRecipesBlogsData();

  if (trendingQuickVoicesLoading) {
    return (
      <div className="mt-12">
        <div className={`overflow-hidden  mb-2`}>
          <div>
            <Title> Trending this week</Title>
          </div>
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
    <div className="-mt-8">
      <div className={`overflow-hidden  mb-2`}>
        <div>
          <Title> Trending this week</Title>
        </div>
      </div>
      <div
        className=" md:grid 
        md:grid-cols-2 lg:grid-cols-3 gap-x-6  gap-y-4 md:gap-y-5  space-y-2 md:space-y-0"
      >
        {trendingRecipes?.slice(0, 3).map((item, index) => (
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
