import { Suspense, lazy } from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";
import NewUsers from "./NewUsers";
import PostedChart from "./PostedChart";
import Totals from "./Totals";

const Overview = () => {
  const {
    userData,
    recipesData,
    blogsData,
    overviewStates,
    isOverviewStateLoading,
  } = useDashboardContext();
  console.log("overview is loading", isOverviewStateLoading);

  return (
    <div className="min-h-screen">
      {/* numbers of user, recipes ,blogs created */}

      <Totals
        overviewStatesLoading={isOverviewStateLoading}
        overviewStates={overviewStates}
      />

      <hr />
      {/* chart and new users*/}
      <div className="lg:flex gap-2 mt-4">
        {/* chart */}
        <div className="lg:w-[70%] shadow-md rounded-lg p-2">
          <PostedChart recipes={recipesData} blogs={blogsData} />
        </div>
        {/* new users */}
        <div className="mt-4 lg:mt-0 shadow-md rounded-lg p-2 flex-grow">
          <NewUsers users={userData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
