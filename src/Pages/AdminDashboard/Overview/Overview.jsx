import useDashboardContext from "../../../hooks/useDashboardContext";

const Overview = () => {
  const { userData, recipesData, blogsData } = useDashboardContext();

  return (
    <div className="min-h-screen">
      <div className="md:flex justify-evenly">
        <div className="text-2xl text-center p-4 shadow-lg rounded-lg">
          <p>Total users</p>
          <p>{userData?.length}</p>
        </div>
        <div className="text-2xl text-center p-4 shadow-lg rounded-lg">
          <p>Recipe created</p>
          <p>{recipesData?.length}</p>
        </div>
        <div className="text-2xl text-center p-4 shadow-lg rounded-lg">
          <p>Blog created</p>
          <p>{blogsData?.length}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Overview;
