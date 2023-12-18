import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LoupeOutlinedIcon from "@mui/icons-material/LoupeOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddBtn = () => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showOptions &&
        !document.querySelector("#addBtn").contains(e.target)
      ) {
        setShowOptions((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions]);

  return (
    <div
      id="addBtn"
      className="fixed md:right-24 right-8 md:bottom-20 bottom-8 text-colorTwo z-40  rounded-full"
    >
      <div className="relative w-fit transition-all duration-500  rounded-full">
        {/* add button */}
        <button
          onClick={() => setShowOptions((prev) => !prev)}
          className={` w-fit rounded-full px-[0.25rem] py-1 bg-colorOne  text-white hover:scale-105 transition-all duration-300 cursor-pointer ${
            showOptions && "rotate-45"
          }`}
        >
          <AddOutlinedIcon sx={{ fontSize: 40 }} />
        </button>

        {/* tooltip */}
        <div
          className={`absolute bottom-10 right-10  bg-bgColor w-max md:px-5 md:py-3  px-2 py-3 space-y-3 md:space-y-5  rounded-xl shadow-lg text-xl font-semibold flex flex-col  ${
            showOptions ? "block " : "hidden"
          } `}
        >
          <Link to={"/addrecipe"} className="cursor-pointer px-3 rounded-lg">
            <LoupeOutlinedIcon sx={{ fontSize: 30 }} /> Create new recipe
          </Link>
          <Link to={"/addblog"} className="cursor-pointer px-3 rounded-lg">
            <EditNoteOutlinedIcon sx={{ fontSize: 35 }} />
            Create a blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddBtn;
