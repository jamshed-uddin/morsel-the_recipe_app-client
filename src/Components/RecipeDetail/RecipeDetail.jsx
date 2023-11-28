import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorElement from "../ErrorElement";
import DetailSkeleton from "../DetailSkeleton";
import { Avatar } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [recipeDetail, setRecipeDetail] = useState({});
  console.log(recipeDetail);
  console.log(id);
  const { isLoading, data, error, refetch } = useQuery(
    "recipeDetail",
    async () => {
      const result = axios.get(
        `${import.meta.env.VITE_BASEURL}singleRecipe/${id}`
      );
      return result;
    }
  );

  useEffect(() => {
    if (data) {
      setRecipeDetail(data.data);
    }
  }, [data]);

  console.log(data);

  if (error) {
    return <ErrorElement refetch={refetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-24 mt-20  ">
      <DetailSkeleton itemType={"Recipe"} />
    </div>
  ) : (
    <div className="my-container lg:px-24 mt-20  text-colorTwo">
      {/* recipe detail container */}
      <div>
        {/* recipe info and creator info */}
        <div className="md:flex gap-4">
          {/* recipe images */}
          <div className="md:w-2/5 h-[60vh] overflow-hidden rounded-tl-xl  rounded-tr-xl md:rounded-xl select-none">
            <img
              className="object-cover"
              src={recipeDetail?.recipeImages}
              alt=""
            />
          </div>
          {/* recipe & creator info */}

          <div className=" flex-grow bg-bgColor -mt-4 relative z-20 rounded-3xl ">
            {/* edit , share, options button */}
            <div className="flex gap-5 items-center justify-end mr-3 md:mr-0">
              {user?.email === recipeDetail?.creatorInfo?.email && (
                <button className="cursor-pointer p-1">
                  <DriveFileRenameOutlineOutlinedIcon
                    sx={{ color: "#4B5365", fontSize: 25 }}
                  />
                </button>
              )}
              <button className="cursor-pointer p-1">
                <ShareOutlinedIcon sx={{ color: "#4B5365", fontSize: 25 }} />
              </button>
              <button className="cursor-pointer p-1">
                <MoreHorizOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 25 }}
                />
              </button>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              {recipeDetail?.recipeName}
            </h1>
            <div className="flex items-center gap-1">
              {/* <Avatar
              sx={{ width: 30, height: 30 }}
              src={
                recipeDetail?.creatorInfo?.photoURL ||
                "https://i.ibb.co/Twp960D/default-profile-400x400.png"
              }
            /> */}

              <h3 className="text-lg ">
                {" "}
                By{" "}
                <span className="text-base">
                  {recipeDetail?.creatorInfo?.name}
                </span>
              </h3>
            </div>

            {/* like save print button */}
            <div className="flex items-center gap-6 mt-2">
              <p>
                <button className="cursor-pointer ">
                  <FavoriteBorderOutlinedIcon
                    sx={{ color: "#4B5365", fontSize: 28 }}
                  />{" "}
                </button>{" "}
                {recipeDetail?.likedBy?.length}
              </p>
              <button className="cursor-pointer ">
                <BookmarkBorderOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 28 }}
                />{" "}
              </button>
              <button onClick={window.print} className="cursor-pointer ">
                <LocalPrintshopOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 28 }}
                />{" "}
              </button>
            </div>
            {/* cooktime preptime servings */}
            <div className=" flex items-center justify-between mt-7">
              <div className=" text-center">
                <p className="text-lg font-semibold">Prep time</p>
                <p> 20 minutes</p>
              </div>
              <div className=" text-center">
                <p className="text-lg font-semibold">Cook time</p>
                <p> 20 minutes</p>
              </div>
              <div className=" text-center">
                <p className="text-lg font-semibold">Serves</p>
                <p> 3</p>
              </div>
            </div>
          </div>
        </div>
        {/* recipe body */}
        <div className="mt-6 space-y-5">
          {/* description */}
          <div>
            <h1 className="text-3xl">Description</h1>
            <p className="text-xl">{recipeDetail?.description}</p>
          </div>
          {/* ingredients */}
          <div>
            <h1 className="text-3xl">Ingredients</h1>
            {recipeDetail?.ingredients?.map((ingredient, index) => (
              <p key={index} className="text-xl">
                {ingredient}
              </p>
            ))}
          </div>
          {/* instructions */}
          <div className="">
            <h1 className="text-3xl">Instructions</h1>
            {recipeDetail?.instructions?.map((instruction, index) => (
              <div key={index} className="text-xl mb-5">
                <h3 className="font-semibold">
                  {instruction && `Step ${index + 1}`}
                </h3>
                <p> {instruction && instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
