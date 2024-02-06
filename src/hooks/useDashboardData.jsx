import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardData = (endPoint) => {
  const axiosSecure = useAxiosSecure();
  const queryKey = [endPoint];

  const fetchData = async () => {
    try {
      const result = await axiosSecure.get(`${endPoint}`);

      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return useQuery(queryKey, fetchData);
};

export default useDashboardData;
