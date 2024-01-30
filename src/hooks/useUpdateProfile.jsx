import useAuthContext from "./useAuthContext";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const updateProfile = async (updatedUserInfo) => {
    // const { name, photoURL, bio } = updatedUserInfo;
    try {
      const dbResponse = await axiosSecure.put(
        `/updateUser/${user?.email}`,
        updatedUserInfo
      );

      return dbResponse;
    } catch (error) {
      return error;
    }
  };

  return { updateProfile };
};

export default useUpdateProfile;
