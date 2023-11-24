import React, { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "react-query";
import axios from "axios";

const useSingleUser = () => {
  const { user, loading } = useAuthContext();
  const [currentUser, setCurrentUser] = useState();

  const { isLoading, data, isError, error } = useQuery(
    ["singleUser", user],
    async () => {
      const result = axios.get(
        `${import.meta.env.VITE_BASEURL}singleUser/${user?.email}`
      );
      return result;
    },
    {
      onSuccess: (data) => {
        setCurrentUser(data.data);
      },
    }
  );

  return { currentUser };
};

export default useSingleUser;
