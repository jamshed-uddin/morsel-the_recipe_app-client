import useAuthContext from "./useAuthContext";
import axios from "axios";

const useUpdateProfile = () => {
  const { user, updateUserNamePhoto } = useAuthContext();

  const updateProfile = async (name, photoURL, bio) => {
    try {
      const fireResponse = await updateUserNamePhoto(name, photoURL).then(
        () => {
          return "firebase profile info updated";
        }
      );

      const dbResponse = await axios.put(
        `${import.meta.env.VITE_BASEURL}/updateUser/${user?.email}`,
        {
          name,
          bio,
          photoURL,
        }
      );

      return { fireResponse, dbResponse };
    } catch (error) {
      return error;
    }
  };

  return { updateProfile };
};

export default useUpdateProfile;
