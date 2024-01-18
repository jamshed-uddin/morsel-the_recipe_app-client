import { useQuery } from "react-query";
import axios from "axios";

const useGetUser = (userId) => {
  const {
    isLoading: getUserLoading,
    data: userData,
    isError,
    error,
  } = useQuery(
    ["getUser", userId],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/getUser?userId=${userId}`
      );

      return result.data;
    },
    {
      enabled: !!userId,
    }
  );

  return { userData, getUserLoading };
};

export default useGetUser;
