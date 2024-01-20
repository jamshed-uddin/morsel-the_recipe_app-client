import { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import AddBtn from "../../Components/AddBtn/AddBtn";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Avatar, CircularProgress, Dialog } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useSingleUser from "../../hooks/useSingleUser";
import { useQuery } from "react-query";
import MyItems from "./MyItems";
import AccountPageSkeleton from "../../Components/Skeletons/AccountPageSkeleton";
import MyButton from "../../Components/Button/MyButton";
import deletePhotoFromCloud from "../../Components/MyFunctions/deletePhotoFromCloud";
import uploadPhotoToCloud from "../../Components/MyFunctions/uploadPhotoToCloud";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useGetUser from "../../hooks/useGetUser";
import ErrorElement from "../../Components/ErrorElement";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("myRecipes");
  const [showSettings, setShowSettings] = useState(false);
  const [showImgTooltip, setShowImgTooltip] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUploadLoading, setPhotoUploadLoading] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { user, userLogout, updateUserNamePhoto, deleteUserHandler } =
    useAuthContext();
  const { currentUser } = useSingleUser();
  const { updateProfile } = useUpdateProfile();
  const [profilePhotoURL, setProfilePhotoURL] = useState(user && user.photoURL);
  const { userId } = useParams();
  console.log(typeof userId);

  const navigate = useNavigate();

  const { userData, getUserLoading, userRefetch, userError } =
    useGetUser(userId);

  // for the setting button and image select button to close when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showSettings &&
        !document.querySelector("#settings")?.contains(e.target)
      ) {
        setShowSettings((prev) => !prev);
      }

      if (
        showImgTooltip &&
        !document.querySelector("#imgTooltip")?.contains(e.target)
      ) {
        setShowImgTooltip((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings, showImgTooltip]);

  // query for fetching tab data(recipe/blog/saved item)
  const {
    isLoading: myItemsLoading,
    data: myItems,
    error: myItemsError,
  } = useQuery(
    ["myItems", activeTab, userData],
    async () => {
      if (activeTab === "savedItems") {
        const result = await axios.get(
          `${import.meta.env.VITE_BASEURL}/${activeTab}?userId=${
            userData?._id
          }&itemType=All`
        );

        return result.data;
      }

      if (activeTab !== "savedItems") {
        const result = await axios.get(
          `${import.meta.env.VITE_BASEURL}/${activeTab}?userId=${userData?._id}`
        );

        return result.data;
      }
    },
    {
      enabled: !!userData,
    }
  );

  // setting modal open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // setting modal close
  const handleClose = () => {
    setOpen(false);
    // setChecked(false);
  };

  // user logout funciton(firebase)
  const handleLogout = async () => {
    await userLogout().then(navigate("/"));
  };

  // uploading changed profile photo to cloudinary
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setProfilePhotoURL(previewURL);

    setShowImgTooltip(false);
    if (file) {
      try {
        setPhotoUploadLoading(true);
        await uploadPhotoToCloud(file).then(async (res) => {
          const cloudImageUrl = res.data.secure_url;
          setPhotoUploadLoading(false);
          setProfilePhotoURL(cloudImageUrl);

          const response = await updateProfile(
            user?.displayName,
            cloudImageUrl,
            currentUser?.bio
          );
          userRefetch();
          console.log(response);
        });
      } catch (error) {
        setPhotoUploadLoading(false);
      }
    }
  };

  // profile info updating function for both firebase and DB
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      name: e.target.name.value,
      bio: e.target.bio.value,
    };
    // console.log(updatedProfile);

    try {
      setLoading(true);

      const response = await updateProfile(
        updatedProfile.name,
        user?.photoURL,
        updatedProfile.bio
      );

      console.log(response);

      setLoading(false);
      userRefetch();
      handleClose();
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const removeProfilePhoto = async () => {
    setProfilePhotoURL("");
    setShowImgTooltip(false);
    const response = await deletePhotoFromCloud(
      profilePhotoURL || user?.photoURL
    );
    console.log(response);

    const dbAndFirebaseResponse = await updateProfile(
      user?.displayName,
      "",
      userData?.bio
    );
    userRefetch();

    console.log(dbAndFirebaseResponse);
  };

  // delete account handler
  // const deleteAccountHandler = async () => {
  //   console.log("clicked");
  //   try {
  //     setDeleteLoading(true);
  //     await deleteUserHandler();

  //     await axios
  //       .delete(
  //         `${import.meta.env.VITE_BASEURL}/deleteUser?userEmail=${
  //           user?.email
  //         }&userId=${currentUser?._id}`
  //       )
  //       .then(() => {
  //         setDeleteLoading(false);
  //         navigate("/");
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     setDeleteLoading(false);
  //     handleClose();
  //   }
  // };

  if (userError) {
    return (
      <ErrorElement error={userError} refetch={userRefetch}></ErrorElement>
    );
  }

  if (getUserLoading || !user || !userData) {
    return (
      <div className="my-container mt-24">
        <AccountPageSkeleton />
      </div>
    );
  }

  return (
    <div
      className={`
          "my-container mt-6 lg:mt-0"
      `}
    >
      <div
        className={
          " lg:w-11/12 h-full  mx-auto lg:px-10 md:pt-20 pt-5 text-colorTwo"
        }
      >
        <div className="flex flex-col md:flex-row items-start justify-between space-y-6 px-2 md:px-2 lg:px-0">
          {/* user info */}
          <div className="lg:flex items-center gap-5 md:w-4/5 space-y-3">
            <div className="flex justify-center  select-none">
              <div id="imgTooltip" className="relative ">
                <Avatar
                  sx={{ width: 135, height: 135 }}
                  className="w-32 rounded-full object-cover"
                  src={userData?.photoURL}
                  alt={`${userData?.name}'s photo`}
                />

                {/* tooltip opener button */}
                {currentUser?.email === userData?.email && (
                  <button
                    onClick={() => setShowImgTooltip((prev) => !prev)}
                    className="w-fit rounded bg-white absolute right-2 bottom-2 cursor-pointer active:scale-95 shadow"
                  >
                    <DriveFileRenameOutlineOutlinedIcon />
                  </button>
                )}
                {/* image tooltip */}
                <div
                  className={`bg-white flex gap-2 md:gap-5 rounded-lg px-1 md:px-3 shadow-lg absolute bottom-2 -right-20 md:-right-28 ${
                    !showImgTooltip && "hidden"
                  }`}
                >
                  <div className="bg-slate-50 p-1  rounded-lg text-lg cursor-pointer">
                    <label className="cursor-pointer" htmlFor="profilePhoto">
                      <AddPhotoAlternateOutlinedIcon />
                    </label>
                    <input
                      onChange={handleProfilePhotoChange}
                      type="file"
                      name="profilePhoto"
                      id="profilePhoto"
                      className="hidden"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeProfilePhoto}
                    className="bg-slate-50 p-1  rounded-lg text-lg cursor-pointer"
                  >
                    <DeleteOutlinedIcon />
                  </button>
                </div>
                {photoUploadLoading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CircularProgress size={50} sx={{ color: "white" }} />
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-semibold mb-1">
                {userData?.name}
                {userData?.role === "admin" && (
                  <sup className="mb-2 font-light text-lg p-1 border-[1px] border-colorOne rounded-lg">
                    Admin
                  </sup>
                )}
              </h1>
              <p className="text-lg  leading-6">{userData?.bio}</p>
            </div>
          </div>

          {/* settings */}
          <div
            id="settings"
            className=" order-first md:order-none relative  ml-auto -bottom-12 md:bottom-0 mr-3"
          >
            {/* setting button */}
            {currentUser?.email === userData?.email && (
              <button
                onClick={() => setShowSettings((prev) => !prev)}
                className={`  rounded-full transition-all duration-500 ${
                  showSettings && "rotate-[30deg]"
                }`}
              >
                <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
              </button>
            )}

            {/* setting options dialog */}
            <div
              className={`absolute top-11 right-4 bg-bgColor w-max p-4 space-y-4  rounded-xl shadow-lg text-lg font-semibold flex flex-col items-start ${
                showSettings ? "block " : "hidden"
              } `}
            >
              <button
                onClick={() => {
                  // based on this setModalContent modal content will display
                  setModalContent("editProfile");
                  handleClickOpen();
                }}
                className="cursor-pointer"
              >
                <DriveFileRenameOutlineOutlinedIcon /> Edit profile
              </button>
              {/* <button
                onClick={() => {
                  setModalContent("account");
                  handleClickOpen();
                }}
                className="cursor-pointer"
              >
                <PersonOutlineOutlinedIcon /> Account
              </button> */}

              <button onClick={handleLogout} className="cursor-pointer">
                <LogoutOutlinedIcon /> Sign out
              </button>
            </div>
          </div>
        </div>

        {/* recipe/blog/saved section  --- conditionally rendering this tab part becaues this account component also used in admin dashboard for admin profile */}
        {currentUser?.role !== "admin" && user && currentUser && (
          <div className=" mt-14 px-2">
            {/* tab buttons  */}
            <div className="flex items-end gap-10 text-2xl font-semibold border-b-[1px] border-slate-300 ">
              <button
                onClick={() => setActiveTab("myRecipes")}
                className={` pb-2 cursor-pointer ${
                  activeTab === "myRecipes"
                    ? "border-b-2  border-colorOne text-colorOne"
                    : "text-colorTwo border-b-2 border-b-transparent "
                }`}
              >
                Recipes
              </button>
              <button
                onClick={() => setActiveTab("myBlogs")}
                className={` pb-2 cursor-pointer ${
                  activeTab === "myBlogs"
                    ? "border-b-2  border-colorOne text-colorOne"
                    : "text-colorTwo border-b-2 border-b-transparent "
                }`}
              >
                Blogs
              </button>
              {currentUser?.email === userData?.email && (
                <button
                  onClick={() => setActiveTab("savedItems")}
                  className={` pb-2 cursor-pointer  ${
                    activeTab === "savedItems"
                      ? "border-b-2  border-colorOne text-colorOne"
                      : "text-colorTwo border-b-2 border-b-transparent"
                  }`}
                >
                  Saved
                </button>
              )}
            </div>

            {/*tab body */}
            <div className="pt-3 pb-6">
              <MyItems
                isLoading={myItemsLoading}
                myItems={myItems}
                activeTab={activeTab}
              />
            </div>
          </div>
        )}
      </div>

      {/* button for adding recipe or blog */}
      {currentUser?.role !== "admin" &&
        currentUser?.email === userData?.email && <AddBtn />}

      {/* dialogue from setting button for updating/account/ sign out */}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <div className="h-[70vh] md:h-[90vh] pt-10 bg-bgColor text-colorTwo">
          {/* update profile info  */}
          {modalContent === "editProfile" && (
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
                      defaultValue={currentUser?.name}
                    />
                  </div>

                  <div>
                    <label className="text-xl font-semibold" htmlFor="bio">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      defaultValue={currentUser?.bio}
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
          )}

          {/* account deleting info */}
          {/* {modalContent === "account" && (
            <div className=" w-[90%] mx-auto">
              <div className="">
                <h1 className=" text-4xl ">Delete account</h1>

                {currentUser?.role === "admin" ? (
                  <div className="mt-4 ml-1">
                    <div className="text-colorOne">
                      <h1 className="text-2xl ">This will also remove</h1>
                      <div className="text-lg leading-6">
                        <h4>- Personal information</h4>
                        <h4>- Control over management</h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 ml-1">
                    <div className="text-colorOne">
                      <h1 className="text-2xl ">This will also remove</h1>
                      <div className="text-lg leading-6">
                        <h4>- Personal information</h4>
                        <h4>- Recipes</h4>
                        <h4>- Blogs </h4>
                        <h4>- Saved items</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className=" mt-8 ">
                <div className="flex gap-3 items-center  mb-3">
                  <Checkbox
                    sx={{
                      p: 0,
                      color: "inherit",
                      "&.Mui-checked": {
                        color: "inherit",
                      },
                    }}
                    checked={checked}
                    onChange={handleCheckBoxChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <p className="text-lg">I am aware</p>
                </div>
                <div className="">
                  <MyButton
                    loading={deleteLoading}
                    disabledForOthers={!checked}
                  >
                    Delete
                  </MyButton>
                  <MyButton variant={"outlined"} clickFunction={handleClose}>
                    Cancel
                  </MyButton>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </Dialog>
    </div>
  );
};

export default AccountPage;
