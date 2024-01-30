// import "./Blogs.css";
import Card from "../../../Components/Card/Card";

import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";
import Title from "../../../Components/Title";

import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";

const Blogs = () => {
  const { morselVoices, trendingQuickVoicesLoading } = useRecipesBlogsData();

  if (trendingQuickVoicesLoading) {
    return (
      <div className="mt-12">
        <div className={`  mb-1`}>
          <Title>Morsel voices</Title>
        </div>
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-x-6  space-y-3 md:space-y-0">
          {[1, 2, 3].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-12">
      <div className={`  mb-1`}>
        <Title>Morsel voices</Title>
      </div>
      <div
        id="outer-container"
        className=" overflow-x-auto lg:overflow-hidden pb-7 md:py-0"
      >
        <div className="w-max flex flex-nowrap lg:grid   lg:grid-cols-3 gap-x-6  md:gap-y-6  ">
          {morselVoices?.map((item, index) => (
            <Card index={index} itemType="blog" item={item} key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
