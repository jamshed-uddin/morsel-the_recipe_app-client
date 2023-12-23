// import "./Blogs.css";
import Card from "../../../Components/Card/Card";

import CardSkeleton from "../../../Components/Skeletons/CardSkeleton";

import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";

const Blogs = () => {
  const { blogs, blogsLoading } = useRecipesBlogsData();

  if (blogsLoading) {
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
    <div className="mt-4 md:mt-12">
      <div className={`overflow-hidden  mb-1`}>
        <h1 className={`text-3xl md:text-5xl text-colorOne  `}>
          Morsel voices
        </h1>
      </div>
      <div
        id="outer-container"
        className=" overflow-x-auto lg:overflow-hidden pb-7 md:py-0"
      >
        <div className="w-max flex flex-nowrap lg:grid   lg:grid-cols-3 gap-x-6  md:gap-y-6  ">
          {blogs?.slice(0, 4).map((item, index) => (
            <Card index={index} itemType="blog" item={item} key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
