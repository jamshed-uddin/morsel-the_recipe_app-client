import axios from "axios";
import { useInfiniteQuery } from "react-query";

const useInfiniteData = (endPoint) => {
  const queryKey = [endPoint];

  const fetchData = async ({ pageParam = 1 }) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}${endPoint}?page=${pageParam}`
      );

      return result?.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const queryConfig = {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length ? allPages?.length + 1 : undefined;
    },
  };

  return useInfiniteQuery(queryKey, fetchData, queryConfig);
};

export default useInfiniteData;
