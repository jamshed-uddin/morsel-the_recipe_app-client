import useAuthContext from "./useAuthContext";
import { useQuery } from "react-query";

import useAxiosSecure from "./useAxiosSecure";

const useSingleUser = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: currentUserLoading,
    data: currentUser,
    isError,
    error,
  } = useQuery(
    ["singleUser", user],
    async () => {
      const result = await axiosSecure.get(`/singleUser/${user?.email}`);

      return result.data;
    },
    {
      enabled: !!user,
    }
  );

  return { currentUser, currentUserLoading };
};

export default useSingleUser;
