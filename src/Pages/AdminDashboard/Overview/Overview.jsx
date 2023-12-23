import useDashboardContext from "../../../hooks/useDashboardContext";
import PostedChart from "./PostedChart";

const Overview = () => {
  const { userData, recipesData, blogsData } = useDashboardContext();

  return (
    <div className="min-h-screen">
      {/* numbers of user, recipes ,blogs created */}
      <div className="flex justify-center mb-4">
        <div className="md:flex gap-2">
          <div className="text-2xl text-center p-4 shadow rounded-lg">
            <p>Total users</p>
            <p>{userData?.length}</p>
          </div>
          <div className="text-2xl text-center p-4 shadow rounded-lg">
            <p>Recipe created</p>
            <p>{recipesData?.length}</p>
          </div>
          <div className="text-2xl text-center p-4 shadow rounded-lg">
            <p>Blog created</p>
            <p>{blogsData?.length}</p>
          </div>
          <div></div>
        </div>
      </div>
      <hr />
      {/* chart */}
      <div>
        <PostedChart recipes={recipesData} blogs={blogsData} />
      </div>
    </div>
  );
};

export default Overview;
