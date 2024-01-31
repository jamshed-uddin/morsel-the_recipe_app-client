import axios from "axios";
import { useInfiniteQuery } from "react-query";

const useInfiniteData = (endPoint, category = "") => {
  const queryKey = [endPoint, category];

  const fetchData = async ({ pageParam = 1 }) => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }${endPoint}?page=${pageParam}&category=${category}`
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
