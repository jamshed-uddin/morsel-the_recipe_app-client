import axios from "axios";
import { useQuery } from "react-query";

const useDashboardData = (endPoint) => {
  const queryKey = [endPoint];

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}${endPoint}`
      );

      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return useQuery(queryKey, fetchData);
};

export default useDashboardData;
