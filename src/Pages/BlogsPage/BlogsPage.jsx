import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import AddBtn from "../../Components/AddBtn/AddBtn";

import useInfiniteData from "../../hooks/useInfiniteData";
import ItemsComp from "./ItemsComp";
import Title from "../../Components/Title";
import useIntersect from "../../hooks/useIntersect";
import { CircularProgress } from "@mui/material";
import ErrorElement from "../../Components/ErrorElement";

const BlogsPage = () => {
  const {
    data: blogs,
    isLoading: blogsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    status,
    refetch,
  } = useInfiniteData("/allBlogs/approved");

  const fetchNextBlogsPageHandler = (isIntersecting) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const loadMoreBlogsRef = useIntersect(fetchNextBlogsPageHandler);

  if (error || status === "error") {
    return <ErrorElement error={error} refetch={refetch}></ErrorElement>;
  }

  return (
    <div className="my-container mb-10 relative">
      <div className="sticky top-0 left-0 right-0 z-40 pt-2 bg-bgColor">
        <Title>Blogs</Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-5">
        {blogsLoading
          ? [1, 2, 3].map((item, index) => <CardSkeleton key={index} />)
          : blogs?.pages.map((blog, index) => (
              <ItemsComp itemsType={"blogs"} key={index} items={blog} />
            ))}
      </div>
      <div ref={loadMoreBlogsRef} className="flex justify-center mt-6 ">
        {hasNextPage && (
          <div className=" h-fit w-fit">
            {isFetchingNextPage && (
              <CircularProgress sx={{ color: "#F31559" }} />
            )}
          </div>
        )}
      </div>
      <AddBtn />
    </div>
  );
};

export default BlogsPage;
