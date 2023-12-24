import useAuthContext from "./useAuthContext";
import { useQuery } from "react-query";
import axios from "axios";

const useSingleUser = () => {
  const { user } = useAuthContext();

  const {
    isLoading: currentUserLoading,
    data: currentUser,
    isError,
    error,
  } = useQuery(
    ["singleUser", user],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/singleUser/${user?.email}`
      );

      return result.data;
    },
    {
      enabled: !!user,
    }
  );

  return { currentUser, currentUserLoading };
};

export default useSingleUser;
