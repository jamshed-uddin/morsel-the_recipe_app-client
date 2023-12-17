import { useState } from "react";
import Card from "../../Components/Card/Card";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import useRecipesBlogsData from "../../hooks/useRecipesBlogsData";

const BlogsPage = () => {
  const { blogs, blogsLoading } = useRecipesBlogsData();
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  if (blogsLoading) {
    return (
      <div className="my-container mt-20">
        <div>
          <h1 className="uppercase text-5xl font-bold text-colorOne">Blogs</h1>
        </div>
        <div className=" grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 space-y-3 md:space-y-0">
          {[1, 2, 3].map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-container mb-10 relative">
      <div className="sticky top-0 left-0 right-0 z-40 pt-2 bg-bgColor flex">
        <h1 className="uppercase text-5xl font-bold text-colorOne w-2/3">
          Blogs
        </h1>
        <div className="flex-grow">
          <SearchBar
            data={blogs}
            searchFor={"blog"}
            setIsSearching={setIsSearching}
            setSearchResult={setSearchResult}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-8">
        {isSearching ? (
          searchResult.length ? (
            searchResult.map((searchItem, index) => (
              <Card itemType="blog" item={searchItem} key={index}></Card>
            ))
          ) : (
            <div className="text-2xl ml-1 text-colorTwo">No blog found!</div>
          )
        ) : (
          blogs?.map((item, index) => (
            <Card itemType="blog" item={item} key={index}></Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
