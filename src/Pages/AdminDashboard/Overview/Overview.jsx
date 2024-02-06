import { useQuery } from "react-query";
import ErrorElement from "../../../Components/ErrorElement";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import useDashboardData from "../../../hooks/useDashboardData";
import NewUsers from "./NewUsers";
import PostedChart from "./PostedChart";
import Totals from "./Totals";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
  } = useQuery(["users"], async () => {
    try {
      const result = await axiosSecure.get(`/users`);
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const {
    data: recipesData,
    isLoading: recipesLoading,
    error: recipesError,
  } = useDashboardData("/allRecipes");
  const {
    data: blogsData,
    isLoading: blogsLoading,
    error: blogsError,
  } = useDashboardData("/allBlogs");
  const {
    data: overviewStates,
    isLoading: overviewStateLoading,
    error: overviewStatesError,
  } = useDashboardData("/overviewStates");

  if (recipesError || blogsError || overviewStatesError || userFetchError) {
    <ErrorElement />;
  }

  if (
    overviewStateLoading ||
    blogsLoading ||
    recipesLoading ||
    userFetchLoading
  ) {
    return (
      <div className="md:flex items-center gap-2 my-2 ">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={`h-44 flex-grow  bg-slate-200 rounded-xl animate-pulse mb-2 md:mb-0 ${
              index === 2 ? "hidden md:block" : ""
            }`}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ReactHelmet title={`Overview | Dashboard - Morsel`} />
      {/* numbers of user, recipes ,blogs created */}

      <Totals overviewStates={overviewStates} />

      <hr />
      {/* chart and new users*/}
      <div className="lg:flex gap-2 mt-4">
        {/* chart with blog and recipe creation stat */}
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
