import { Dialog } from "@mui/material";
import { useState } from "react";
import MyButton from "../../Components/Button/MyButton";
import useSingleUser from "../../hooks/useSingleUser";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useGetUser from "../../hooks/useGetUser";

const EditProfileDialog = ({ open, handleClose }) => {
  const { currentUser } = useSingleUser();
  const { userData, userRefetch } = useGetUser(currentUser._id);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useUpdateProfile();
  const [bioLimitExceded, setBioLimitExceded] = useState(false);

  console.log(userData);
  // profile info updating function for both firebase and DB
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("clicked");

    if (e.target.bio.value.length > 150) {
      return setBioLimitExceded(true);
    } else {
      setBioLimitExceded(false);
    }

    const updatedProfile = {
      name: e.target.name.value,
      bio: e.target.bio.value,
    };
    console.log(updatedProfile);

    try {
      setLoading(true);

      const response = await updateProfile({
        name: updatedProfile.name,
        photoURL: currentUser?.photoURL,
        bio: updatedProfile.bio,
      });

      console.log(response);

      setLoading(false);
      userRefetch();
      handleClose();
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <div className="h-[70vh] md:h-[90vh] pt-10 bg-bgColor text-colorTwo">
        {/* update profile info  */}

        <div className="w-[90%] mx-auto space-y-4">
          <div>
            <h1 className="text-4xl font-semibold">Edit profile</h1>
          </div>
          {/* update form div */}
          <div className="space-y-2">
            <form onSubmit={handleUpdateProfile} className="space-y-2">
              <div>
                <label className="text-xl font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={userData?.name}
                />
              </div>

              <div>
                <label className="text-xl font-semibold " htmlFor="bio">
                  Bio
                  <span
                    className={`text-sm font-light ml-2 ${
                      bioLimitExceded ? "text-red-500" : ""
                    } `}
                  >
                    (Limited to 150 character)
                  </span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  defaultValue={userData?.bio}
                ></textarea>
              </div>
              <div>
                <MyButton loading={loading} type={"submit"}>
                  Save
                </MyButton>

                <MyButton
                  type={"button"}
                  variant={"outlined"}
                  clickFunction={handleClose}
                >
                  Cancel
                </MyButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
