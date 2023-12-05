import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorElement from "../ErrorElement";
import DetailSkeleton from "../../Components/Skeletons/DetailSkeleton";
import { Avatar, Tooltip } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import useSingleUser from "../../hooks/useSingleUser";
import SimpleSnackbar from "../Snackbar/SimpleSnackbar";
import AlertDialog from "../AlertDialog/AlertDialog";
import StatusChanger from "../StatusChanger/StatusChanger";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { currentUser } = useSingleUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState("delete");
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState({});
  // console.log(currentUser);
  console.log(recipeDetail?.prepTime);
  // console.log(Object.values(recipeDetail?.prepTime).some((value) => value));
  const { isLoading, data, error, refetch } = useQuery(
    "recipeDetail",
    async () => {
      const result = await axios.get(
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

  const {
    data: isLikedAndSaved,
    error: errorMessage,
    refetch: reloadPage,
  } = useQuery(["isSavedAndLiked", currentUser], async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BASEURL}isLikedAndSaved?userEmail=${
        currentUser?.email
      }&itemId=${recipeDetail?._id}&itemType=recipe`
    );
    return result;
  });

  // console.log(data);

  // saving on savedItems collection
  const handleRecipeSave = async () => {
    const body = {
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      itemType: "Recipe", //need the first letter in capital because it's given as refPath in DB schema.
    };

    // if item already saved call delete action
    if (isLikedAndSaved?.data?.isSaved) {
      setOptionsLoading(true);
      console.log("delte action");
      await axios
        .delete(
          `${import.meta.env.VITE_BASEURL}deleteSavedItem?itemId=${
            recipeDetail?._id
          }&userEmail=${currentUser?.email}`
        )
        .then(() => {
          setOptionsLoading(false);
          reloadPage();
          //  setOpen and message for snackbar alert for save/unsave
          setOpen((prev) => !prev);
          setMessage("Recipe unsaved");
        })
        .catch((err) => {
          setOptionsLoading(false);
          console.log(err);
        });
      return;
    }
    setOptionsLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_BASEURL}saveNewItem/${recipeDetail?._id}`,
        body
      )
      .then(() => {
        setOptionsLoading(false);
        reloadPage();
        setOpen((prev) => !prev);
        setMessage("Recipe saved");
      })
      .catch((err) => {
        setOptionsLoading(false);
        console.log(err);
      });
  };

  const handleReaction = async () => {
    // if item already liked calls dislike action
    if (isLikedAndSaved?.data?.isLiked) {
      const body = {
        userId: currentUser?._id,
        action: "dislike",
        actionFrom: "recipe",
      };
      await axios
        .patch(
          `${import.meta.env.VITE_BASEURL}changeReaction/${recipeDetail?._id}`,
          body
        )
        .then((result) => {
          console.log(result);
          refetch();
          reloadPage();
        })
        .catch((err) => console.log(err));
      return;
    }

    // if item not liked yet
    const body = {
      userId: currentUser?._id,
      action: "like",
      actionFrom: "recipe",
    };
    await axios
      .patch(
        `${import.meta.env.VITE_BASEURL}changeReaction/${recipeDetail?._id}`,
        body
      )
      .then((result) => {
        console.log(result);
        refetch();
        reloadPage();
      })
      .catch((err) => console.log(err));
  };

  if (error) {
    return <ErrorElement refetch={refetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-24 mt-20  ">
      <DetailSkeleton itemType={"Recipe"} />
    </div>
  ) : (
    <div className="my-container lg:px-24 mt-20  text-colorTwo">
      {/* status changer for admin only */}
      {currentUser?.role === "admin" && (
        <StatusChanger
          itemId={recipeDetail?._id}
          status={recipeDetail?.status}
          actionFor="recipe"
          actionFrom="detailPage"
          adminEmail={currentUser?.email}
          setOpen={setOpen}
          setMessage={setMessage}
        />
      )}
      {/* recipe detail container */}
      <div>
        {/* recipe info and creator info */}
        <div className="md:flex gap-4">
          {/* recipe images */}
          <div className="md:w-[45%] h-[65vh] overflow-hidden rounded-tl-xl  rounded-tr-xl md:rounded-xl select-none">
            <img
              className="object-cover"
              src={recipeDetail?.recipeImages}
              alt=""
            />
          </div>
          {/* recipe & creator info */}

          <div className="md:mt-1 flex-grow bg-bgColor -mt-4 relative z-20 rounded-3xl ">
            {/* edit , share, delete button */}
            <div className="flex gap-5 items-center justify-end mr-3 md:mr-0">
              {user?.email === recipeDetail?.creatorInfo?.email && (
                <Tooltip title="Edit">
                  <button className="cursor-pointer p-1">
                    <DriveFileRenameOutlineOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 30 }}
                    />
                  </button>
                </Tooltip>
              )}
              <Tooltip title="Share">
                <button
                  onClick={() => {
                    setDialogFor("shareOptions");
                    setDeleteAlertOpen((prev) => !prev);
                  }}
                  className="cursor-pointer p-1"
                >
                  <ShareOutlinedIcon sx={{ color: "#4B5365", fontSize: 28 }} />
                </button>
              </Tooltip>
              {user?.email === recipeDetail?.creatorInfo?.email && (
                <Tooltip title="Delete">
                  <button
                    onClick={() => {
                      setDialogFor("delete");
                      setDeleteAlertOpen((prev) => !prev);
                    }}
                    className="cursor-pointer p-1"
                  >
                    <DeleteOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 30 }}
                    />
                  </button>
                </Tooltip>
              )}
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
              <p className="flex-grow">
                <button
                  disabled={optionsLoading}
                  onClick={handleReaction}
                  className="cursor-pointer "
                >
                  {isLikedAndSaved?.data?.isLiked ? (
                    <FavoriteOutlinedIcon sx={{ color: "red", fontSize: 28 }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 28 }}
                    />
                  )}
                </button>{" "}
                {recipeDetail?.likedBy?.length}
              </p>
              <button
                disabled={optionsLoading}
                onClick={handleRecipeSave}
                className="cursor-pointer flex items-center"
              >
                {isLikedAndSaved?.data?.isSaved ? (
                  <>
                    {" "}
                    <BookmarkOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 28 }}
                    />
                    <span> Saved</span>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <BookmarkBorderOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 28 }}
                    />
                    <span> Save</span>{" "}
                  </>
                )}
              </button>
              <button
                onClick={window.print}
                className="cursor-pointer flex items-center"
              >
                <LocalPrintshopOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 28 }}
                />
                <span>Print</span>
              </button>
            </div>
            {/* cooktime preptime servings */}
            <div className=" flex items-center justify-between mt-14">
              <div className=" text-center">
                <p className="text-lg font-semibold">Prep time</p>
                <p>
                  <span>
                    {recipeDetail?.prepTime?.hours
                      ? `${recipeDetail?.prepTime?.hours} hours`
                      : " "}
                  </span>
                  <span>
                    {recipeDetail?.prepTime?.minutes
                      ? `${recipeDetail?.prepTime?.minutes} minutes`
                      : "0"}
                  </span>
                </p>
              </div>
              <div className=" text-center">
                <p className="text-lg font-semibold">Cook time</p>
                <p>
                  <span>
                    {recipeDetail?.cookTime?.hours
                      ? `${recipeDetail?.cookTime?.hours} hours`
                      : " "}
                  </span>
                  <span>
                    {recipeDetail?.cookTime?.minutes
                      ? `${recipeDetail?.cookTime?.minutes} minutes`
                      : "0"}
                  </span>
                </p>
              </div>

              <div className=" text-center">
                <p className="text-lg font-semibold">Serves</p>
                <p>{recipeDetail?.serving}</p>
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

      <SimpleSnackbar open={open} setOpen={setOpen} message={message} />
      <AlertDialog
        shareURL={"http://www.google.com"}
        dialogFor={dialogFor}
        open={deleteAlertOpen}
        setOpen={setDeleteAlertOpen}
        itemType={"recipe"}
        itemId={recipeDetail?._id}
        userEmail={currentUser?.email}
      />
    </div>
  );
};

export default RecipeDetail;
