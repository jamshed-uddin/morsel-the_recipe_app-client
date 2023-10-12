import { useEffect, useState } from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

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
      className={`fixed top-0 right-0 left-0 flex justify-center z-50  h-16 transition-all duration-500
    ${scrollingDown ? "-translate-y-16" : "-translate-0"}`}
    >
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
            showNav ? "w-10 origin-bottom-left -rotate-45 translate-y-2" : "w-5"
          }`}
        ></div>
      </div>

      <div
        className={`h-screen w-screen bg-bgColor -translate-y-full transition-all duration-700 absolute select-none flex items-end lg:items-center ${
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
  );
};

export default Navbar;
