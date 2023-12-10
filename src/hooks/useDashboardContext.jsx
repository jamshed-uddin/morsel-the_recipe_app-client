import { useContext } from "react";
import { DashboardDataContext } from "../providers/DashboardDataProvider";

const useDashboardContext = () => {
  const dashboardData = useContext(DashboardDataContext);

  return dashboardData || {};
};

export default useDashboardContext;
