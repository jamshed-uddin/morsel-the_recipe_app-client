import useDashboardContext from "../../../hooks/useDashboardContext";
import NewUsers from "./NewUsers";
import PostedChart from "./PostedChart";
import Totals from "./Totals";

const Overview = () => {
  const { userData, recipesData, blogsData } = useDashboardContext();
  console.log(userData);

  return (
    <div className="min-h-screen">
      {/* numbers of user, recipes ,blogs created */}
      <Totals
        userData={userData}
        recipesData={recipesData}
        blogsData={blogsData}
      />
      <hr />
      {/* chart and new users*/}
      <div className="lg:flex gap-2 mt-4">
        {/* chart */}
        <div className="lg:w-[70%]">
          <PostedChart recipes={recipesData} blogs={blogsData} />
        </div>
        {/* new users */}
        <div className="mt-4 lg:mt-0">
          <NewUsers users={userData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
