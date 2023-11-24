import { useEffect, useState } from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const { user } = useAuthContext();
  console.log(user);

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
      className={`my-container fixed top-0 right-0 left-0 z-50 h-16 flex items-center transition-all duration-500 bg-bgColor 
    ${scrollingDown ? "-translate-y-16" : "-translate-0"}`}
    >
      <div className="flex justify-between items-center  w-full ">
        <div>
          <h2 className="text-4xl font-bold text-colorOne">
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
                <Link to={"/account"}>
                  <div className="flex items-center rounded-3xl cursor-pointer">
                    <Avatar
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/Twp960D/default-profile-400x400.png"
                      }
                      sx={{ width: "35px", height: "35px" }}
                    ></Avatar>
                    {
                      <p>
                        <NavigateNextOutlinedIcon sx={{ fontSize: 28 }} />
                      </p>
                    }
                  </div>
                </Link>
              ) : (
                <Link to={"/signin"}>Sign in</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-black block lg:hidden">
        {/* nav icon and it's transition classes */}
        <div
          onClick={() => setShowNav(!showNav)}
          className={`  space-y-2  h-fit  flex flex-col   cursor-pointer z-50 select-none  absolute  left-[50%] top-4 pl-3 pb-2 `}
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
          className={`h-screen w-screen bg-bgColor -translate-y-full transition-all duration-700 absolute select-none flex lg:items-center ${
            showNav && "translate-y-0"
          }`}
        >
          <div className="lg:w-3/4 w-[90%] h-2/3   mx-auto  flex flex-col lg:flex-row lg:items-center justify-between ">
            <div className="link-container uppercase text-6xl lg:text-8xl text-colorOne tracking-tighter space-y-3 md:space-y-0 font-bold flex flex-col ">
              <Link
                className={`link`}
                to={"/"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Home
              </Link>
              <Link
                className={`link`}
                to={"/recipes"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Recipes
              </Link>
              <Link
                className={`link`}
                to={"/blogs"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Blogs
              </Link>
              <Link
                className={`link`}
                to={"/account"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Account
              </Link>
              <Link
                className={`link`}
                to={"/signin"}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Sign in
              </Link>
            </div>
            <div className="text-colorTwo  flex items-center   h-full">
              <div className="flex  lg:flex-col text-xl  pb-3 lg:pb-0">
                <a href="">
                  Facebook
                  <CallMadeIcon />{" "}
                </a>
                <a href="">
                  Instagram
                  <CallMadeIcon />
                </a>
                <a href="">
                  Twitter
                  <CallMadeIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
