import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddBtn from "../../Components/AddBtn/AddBtn";
import { Avatar, CircularProgress, Dialog } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSingleUser from "../../hooks/useSingleUser";
import { useQuery } from "react-query";
import MyItems from "./MyItems";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("myRecipes");
  const [showSettings, setShowSettings] = useState(false);
  const [showImgTooltip, setShowImgTooltip] = useState(false);
  const [myItems, setMyItems] = useState([]);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { user, userLogout } = useAuthContext();
  const { currentUser } = useSingleUser();
  const [profilePhotoURL, setProfilePhotoURL] = useState(user && user.photoURL);
  // console.log(currentUser);
  // console.log(user);
  // console.log(profilePhotoURL);

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    userLogout().then(navigate("/"));
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      setLoading(true);
      setShowImgTooltip((prev) => !prev);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          imageData
        )
        .then((response) => {
          if (response) {
            const cloudImageUrl = response.data.secure_url;
            setProfilePhotoURL(cloudImageUrl);
          }

          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showSettings &&
        !document.querySelector("#settings").contains(e.target)
      ) {
        setShowSettings((prev) => !prev);
      }

      if (
        showImgTooltip &&
        !document.querySelector("#imgTooltip").contains(e.target)
      ) {
        setShowImgTooltip((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings, showImgTooltip]);

  const { isLoading, data, error } = useQuery(
    [activeTab, currentUser],
    async () => {
      if (activeTab === "savedItems") {
        const result = await axios.get(
          `${import.meta.env.VITE_BASEURL}${activeTab}?userId=${
            currentUser?._id
          }&itemType=All`
        );

        return result;
      }

      if (activeTab !== "savedItems") {
        const result = await axios.get(
          `${import.meta.env.VITE_BASEURL}${activeTab}?userId=${
            currentUser?._id
          }`
        );

        return result;
      }
    }
  );

  useEffect(() => {
    if (data) {
      setMyItems(data.data);
    }
  }, [data]);

  console.log(isLoading);
  console.log(myItems);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const updatedProfile = {
      name: e.target.name.value,
      photoURL: profilePhotoURL || "",
      bio: e.target.bio.value,
    };
    console.log(updatedProfile);
  };

  return (
    <div className=" my-container">
      <div className="lg:w-4/5 h-full  mx-auto lg:px-6 md:pt-20 pt-5 text-colorTwo">
        <div className="flex flex-col md:flex-row items-start justify-between space-y-6 ">
          {/* user info */}
          <div className="lg:flex items-center gap-5 md:w-4/5 space-y-3">
            <div>
              <Avatar
                sx={{ width: 135, height: 135 }}
                className="w-32 rounded-full object-cover"
                src={
                  user?.photoURL ||
                  `https://i.ibb.co/Twp960D/default-profile-400x400.png`
                }
                alt={`${user?.displayName}'s photo`}
              />
            </div>

            <div>
              <h1 className="text-4xl font-semibold mb-1">
                {user?.displayName}
              </h1>
              <p className="text-lg font-light leading-5">
                {" "}
                {currentUser?.bio}
              </p>
            </div>
          </div>

          {/* settings */}
          <div
            id="settings"
            className="order-first md:order-none relative  ml-auto mr-2"
          >
            {/* setting button */}
            <button
              onClick={() => setShowSettings((prev) => !prev)}
              className={`  rounded-full transition-all duration-500 ${
                showSettings && "rotate-[30deg]"
              }`}
            >
              <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
            </button>

            {/* setting options dialog */}
            <div
              className={`absolute top-11 right-4 bg-bgColor w-max p-4 space-y-4  rounded-xl shadow-lg text-lg font-semibold  ${
                showSettings ? "block " : "hidden"
              } `}
            >
              <h3
                onClick={() => {
                  setModalContent("editProfile");
                  handleClickOpen();
                }}
                className="cursor-pointer"
              >
                <DriveFileRenameOutlineOutlinedIcon /> Edit profile
              </h3>
              <h3
                onClick={() => {
                  setModalContent("account");
                  handleClickOpen();
                }}
                className="cursor-pointer"
              >
                <PersonOutlineOutlinedIcon /> Account
              </h3>

              <h3 onClick={handleLogout} className="cursor-pointer">
                <LogoutOutlinedIcon /> Sign out
              </h3>
            </div>
          </div>
        </div>

        {/* recipe/blog/saved section */}
        <div className=" mt-14">
          {/* tab buttons  */}
          <div className="flex items-end gap-10 text-2xl font-semibold border-b-[1px] border-slate-300 pl-2">
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
          </div>

          {/*tab body */}
          <div>
            <MyItems MyItems={myItems} activeTab={activeTab} />
          </div>
        </div>
      </div>
      <AddBtn />

      {/* dialogue from setting button for updating/account/ sign out */}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <div className="h-[80vh] md:h-[90vh] grid items-center bg-bgColor">
          {/* update profile info  */}
          <div className=" w-[90%] mx-auto">
            {/* image div */}
            <div className="flex justify-center  select-none">
              <div id="imgTooltip" className="relative ">
                <Avatar
                  sx={{ width: 135, height: 135 }}
                  className="w-32 rounded-full object-cover"
                  src={
                    user?.photoURL ||
                    `https://i.ibb.co/Twp960D/default-profile-400x400.png`
                  }
                  alt={`${user?.displayName}'s photo`}
                />

                {/* tooltip opener button */}
                <button
                  onClick={() => setShowImgTooltip((prev) => !prev)}
                  className="w-fit rounded bg-white absolute right-2 bottom-2 cursor-pointer active:scale-95 shadow"
                >
                  <DriveFileRenameOutlineOutlinedIcon />
                </button>
                {/* image tooltip */}
                <div
                  className={`bg-white  rounded-lg p-2 shadow-lg space-y-2 absolute bottom-10 md:bottom-3 -right-20 md:-right-44 ${
                    !showImgTooltip && "hidden"
                  }`}
                >
                  <div className="bg-slate-50 p-1  rounded-lg text-lg cursor-pointer">
                    <label className="cursor-pointer" htmlFor="profilePhoto">
                      <InsertPhotoOutlinedIcon /> Choose photo
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
                    onClick={() => setProfilePhotoURL("")}
                    className="bg-slate-50 p-1  rounded-lg text-lg cursor-pointer"
                  >
                    <DeleteOutlinedIcon /> Remove photo
                  </button>
                </div>

                <CircularProgress
                  variant="indeterminate"
                  sx={{
                    display: loading ? "block" : "none",
                    color: "#F31559",
                    position: "absolute",
                    top: "35%",
                    bottom: "50%",
                    left: "35%",
                    right: "50%",
                  }}
                />
              </div>
            </div>

            {/* update form div */}
            <div className="space-y-2">
              <form onSubmit={handleUpdateProfile}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" />
                </div>

                <div>
                  <label htmlFor="bio">Bio</label>
                  <textarea id="bio" name="bio"></textarea>
                </div>
                <div className="space-x-3">
                  <button
                    type="submit"
                    className="border-2 border-colorOne bg-colorOne px-5 py-1 rounded-xl text-lg text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleClose}
                    className="border-2 border-colorOne px-3 py-1 rounded-xl text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AccountPage;
