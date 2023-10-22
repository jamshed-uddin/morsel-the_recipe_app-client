import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBtn from "../../Components/AddBtn/AddBtn";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showSettings &&
        !document.querySelector("#settings").contains(e.target)
      ) {
        setShowSettings((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings]);

  return (
    <div className=" my-container">
      <div className="lg:w-4/5 h-full  mx-auto lg:px-6 md:pt-20 pt-5 text-colorTwo">
        <div className="flex flex-col md:flex-row items-start justify-between space-y-6 ">
          <div className="lg:flex items-center gap-5 md:w-4/5 space-y-3">
            <img
              className="w-32 rounded-full"
              src="https://i.ibb.co/Twp960D/default-profile-400x400.png"
              alt=""
            />

            <div>
              <h1 className="text-4xl font-semibold mb-1">John Doe</h1>
              <p className="text-lg font-light leading-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                numquam quia mollitia sed accusantium debitis voluptatem alias
                explicabo aspernatur rem natus, dignissimos at beatae{" "}
              </p>
            </div>
          </div>

          <div
            id="settings"
            className="order-first md:order-none relative  ml-auto mr-2"
          >
            <button
              onClick={() => setShowSettings((prev) => !prev)}
              className={`  rounded-full transition-all duration-500 ${
                showSettings && "rotate-45"
              }`}
            >
              <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
            </button>

            <div
              className={`absolute top-11 right-4 bg-bgColor w-max p-4 space-y-4  rounded-xl shadow-lg text-lg font-semibold  ${
                showSettings ? "block " : "hidden"
              } `}
            >
              <h3 className="cursor-pointer">
                <DriveFileRenameOutlineOutlinedIcon /> Edit profile
              </h3>
              <h3 className="cursor-pointer">
                <LogoutOutlinedIcon /> Sign out
              </h3>
            </div>
          </div>
        </div>

        <div className=" mt-14">
          <div className="flex items-end gap-10 text-2xl font-semibold border-b-[1px] border-slate-300 pl-2">
            <h1
              onClick={() => setActiveTab("recipes")}
              className={` pb-4 cursor-pointer  ${
                activeTab === "recipes"
                  ? "border-b-2  border-colorOne text-colorOne"
                  : "text-colorTwo"
              }`}
            >
              Recipes
            </h1>
            <h1
              onClick={() => setActiveTab("blogs")}
              className={` pb-4 cursor-pointer  ${
                activeTab === "blogs"
                  ? "border-b-2  border-colorOne text-colorOne"
                  : "text-colorTwo"
              }`}
            >
              Blogs
            </h1>
            <h1
              onClick={() => setActiveTab("saved")}
              className={` pb-4 cursor-pointer  ${
                activeTab === "saved"
                  ? "border-b-2  border-colorOne text-colorOne"
                  : "text-colorTwo"
              }`}
            >
              Saved
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((index, el) => (
              <Card key={index}></Card>
            ))}
          </div>
        </div>
      </div>
      <AddBtn />
    </div>
  );
};

export default AccountPage;
