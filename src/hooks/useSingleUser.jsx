import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "react-query";
import axios from "axios";

const useSingleUser = () => {
  const { user } = useAuthContext();
  const [currentUser, setCurrentUser] = useState();

  const { isLoading, data, isError, error } = useQuery(
    ["singleUser", user],
    async () => {
      const result = axios.get(
        `${import.meta.env.VITE_BASEURL}singleUser/${user?.email}`
      );
      return result;
    }
  );

  useEffect(() => {
    if (data) {
      setCurrentUser(data.data);
    }
  }, [data]);

  return { currentUser };
};

export default useSingleUser;
