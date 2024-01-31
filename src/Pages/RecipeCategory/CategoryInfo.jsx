import Title from "../../Components/Title";

const CategoryInfo = ({ categoryData, loading }) => {
  if (loading) {
    return (
      <div className="mt-4 mb-1 space-y-2">
        <div className="h-9 w-[30%] lg:w-[10%]  rounded-xl animate-pulse bg-gray-200"></div>
        <div className="h-5 w-full  rounded-xl animate-pulse bg-gray-200"></div>
        <div className="h-5 w-[90%]  rounded-xl animate-pulse bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 mb-1">
        <Title>
          {categoryData?.category.charAt(0).toUpperCase() +
            categoryData?.category.slice(1)}{" "}
        </Title>
      </div>
      <div>
        <p className="text-xl leading-6">{categoryData?.description}</p>
      </div>
    </div>
  );
};

export default CategoryInfo;
