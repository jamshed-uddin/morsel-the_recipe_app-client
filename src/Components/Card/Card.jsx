import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Link } from "react-router-dom";

const Card = ({ itemType }) => {
  return (
    <div>
      <Link>
        <div
          className={`w-full h-[22rem]  ${
            itemType === "Blog" ? "" : "rounded-2xl"
          }  relative overflow-hidden`}
        >
          <img
            className={`w-full h-full  object-cover  ${
              itemType === "Blog" ? "" : "rounded-2xl"
            }`}
            src="https://i.ibb.co/CMW27Zb/food3.jpg"
            alt=""
          />
          <div className="flex justify-between py-3 px-4 z-20 absolute bottom-0 right-0 left-0 bg-gradient-to-t from-slate-600">
            <p className="cursor-pointer p-2">
              <FavoriteBorderOutlinedIcon
                sx={{ color: "white", fontWeight: "100" }}
              />
            </p>
            <p className="cursor-pointer p-2">
              <BookmarkBorderOutlinedIcon sx={{ color: "white" }} />
            </p>
          </div>
        </div>
        <div className="">
          <div className="text-colorTwo mt-4">
            <h2 className="text-2xl leading-5 font-medium">
              Lorem ipsum dolor, sit amet consectetur{" "}
            </h2>
            <div
              className={`space-x-4 text-lg mt-1 ${
                itemType === "Blog" && "hidden"
              }`}
            >
              <span>8 ingredients</span>
              <span>20 minutes</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
