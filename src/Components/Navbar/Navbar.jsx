import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import useAuthContext from "../../hooks/useAuthContext";
import useSingleUser from "../../hooks/useSingleUser";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const { user } = useAuthContext();
  const { currentUser } = useSingleUser();

  useEffect(() => {
    if (showNav) {
      return;
    }

    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      prevScrollY = currentScrollY;
    };

    if (!showNav) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showNav]);

  return (
    <div
      className={`print:hidden px-3 lg:px-24 fixed top-0 right-0 left-0 z-50 h-16 flex items-center transition-all duration-500 bg-bgColor 
    ${scrollingDown ? "-translate-y-16" : "-translate-0"}`}
    >
      <div className="flex justify-between items-center  w-full ">
        <div>
          <h2 className="text-[2.6rem] leading-4 font-bold text-colorOne relative z-50">
            <Link to={"/"}>Morsel</Link>
          </h2>
        </div>
        <div className="hidden lg:block">
          <div className="link-container flex items-center gap-16 text-colorOne font-medium text-xl  ">
            <div className={`link`}>
              <Link to={"/"}>Home</Link>
            </div>
            <div className={`link`}>
              <Link to={"/recipes"}>Recipe</Link>
            </div>
            <div className={`link`}>
              <Link to={"/blogs"}>Blogs</Link>
            </div>
            <div className={`${!user && "link"}`}>
              {user ? (
                <Link
                  to={
                    currentUser?.role === "admin"
                      ? "/dashboard/overview"
                      : "/account"
                  }
                >
                  <div className="flex items-center  rounded-3xl cursor-pointer">
                    <Avatar
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/Twp960D/default-profile-400x400.png"
                      }
                      sx={{ width: "35px", height: "35px" }}
                    ></Avatar>

                    <p>
                      <NavigateNextOutlinedIcon sx={{ fontSize: 28 }} />
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to={"/signin"}>Sign in</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <div className=" block lg:hidden ">
        {/* nav icon and it's transition classes */}
        <div
          onClick={() => setShowNav(!showNav)}
          className={`  space-y-2  h-fit  flex flex-col   cursor-pointer z-50 select-none  absolute  right-3 top-4 pl-3 pb-2 `}
        >
          <div
            className={`mr-auto h-[2px]  bg-colorOne transition-all duration-700  ${
              showNav ? "w-10 origin-top-left rotate-45" : "w-5"
            }`}
          ></div>
          <div
            className={`w-10 h-[2px]  bg-colorOne transition-all duration-500  ${
              showNav && "opacity-0"
            }`}
          ></div>
          <div
            className={` h-[2px]  bg-colorOne ml-auto transition-all duration-700  ${
              showNav
                ? "w-10 origin-bottom-left -rotate-45 translate-y-2"
                : "w-5"
            }`}
          ></div>
        </div>

        <div
          className={`w-screen h-screen bg-bgColor absolute top-0 left-0 right-0 bottom-0  flex items-end transition-all duration-700 ${
            showNav
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-10"
          }`}
        >
          <div className=" w-full h-[70vh] flex flex-col">
            <div className="pl-2 uppercase text-6xl  text-colorOne tracking-tighter space-y-4  font-bold flex flex-col ">
              <Link
                to={"/"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Home
              </Link>
              <Link
                to={"/recipes"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Recipes
              </Link>
              <Link
                to={"/blogs"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Blogs
              </Link>
              <div className={`${!user && "link"}`}>
                {user ? (
                  <Link
                    onClick={() => {
                      setShowNav(false);
                    }}
                    to={
                      currentUser?.role === "admin"
                        ? "/dashboard/overview"
                        : "/account"
                    }
                  >
                    <div className="flex items-center rounded-3xl cursor-pointer">
                      {currentUser?.role === "admin" ? "Dashboard" : "Account"}
                    </div>
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      setShowNav(false);
                    }}
                    to={"/signin"}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-auto flex justify-around mb-5">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter(X)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
