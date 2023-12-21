import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "react-query";
import axios from "axios";

const useSingleUser = () => {
  const { user } = useAuthContext();
  const [currentUser, setCurrentUser] = useState();

  const {
    isLoading: currentUserLoading,
    data,
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

  useEffect(() => {
    if (data) {
      setCurrentUser(data);
    }
  }, [data]);

  return { currentUser, currentUserLoading };
};

export default useSingleUser;
