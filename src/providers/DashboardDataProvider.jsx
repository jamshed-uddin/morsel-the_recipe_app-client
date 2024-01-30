import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
export const DashboardDataContext = createContext(null);
const DashboardDataProvider = ({ children }) => {
  const [usersRefetch, setUsersRefetch] = useState(false);
  const axiosSecure = useAxiosSecure();

  // users data
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
  } = useQuery(["users", usersRefetch], async () => {
    try {
      const result = await axiosSecure.get(`/users`);
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const dashboardData = {
    userFetchLoading,
    userData,
    setUsersRefetch,
    userFetchError,
  };

  return (
    <DashboardDataContext.Provider value={dashboardData}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export default DashboardDataProvider;
