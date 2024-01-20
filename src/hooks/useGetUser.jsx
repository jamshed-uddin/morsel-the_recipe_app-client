import { useQuery } from "react-query";
import axios from "axios";

const useGetUser = (userId) => {
  const {
    isLoading: getUserLoading,
    data: userData,
    refetch: userRefetch,

    error: userError,
  } = useQuery(
    ["getUser", userId],
    async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BASEURL}/getUser?userId=${userId}`
        );

        return result.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    {
      enabled: !!userId,
    }
  );

  return { userData, getUserLoading, userRefetch, userError };
};

export default useGetUser;
