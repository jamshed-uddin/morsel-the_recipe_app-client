import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
//------icons ends----
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ErrorElement from "../ErrorElement";
import DetailSkeleton from "../../Components/Skeletons/DetailSkeleton";
import { Tooltip } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import useSingleUser from "../../hooks/useSingleUser";
import SimpleSnackbar from "../Snackbar/SimpleSnackbar";
import AlertDialog from "../AlertDialog/AlertDialog";
import StatusChanger from "../StatusChanger/StatusChanger";
import ReactHelmet from "../ReactHelmet/ReactHelmet";
import StatusAndFeedback from "../statusAndFeedback/statusAndFeedback";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { currentUser } = useSingleUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState("delete");
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [recipeImageIndex, setRecipeImageIndex] = useState(0);

  const {
    isLoading,
    data,
    error,
    refetch: recipeDetailRefetch,
  } = useQuery("recipeDetail", async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BASEURL}/singleRecipe/${id}`
    );
    return result.data;
  });

  useEffect(() => {
    if (data) {
      setRecipeDetail(data);
    }
  }, [data]);

  // is liked and is saved
  const {
    isLoading: isLikedAndSavedLoading,
    data: isLikedAndSaved,
    error: errorMessage,
    refetch: reloadIslikedAndIsSaved,
  } = useQuery(
    ["isSavedAndLiked", currentUser],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/isLikedAndSaved?userEmail=${
          currentUser?.email
        }&itemId=${recipeDetail?._id}&itemType=recipe`
      );
      setIsLiked(result?.data?.isLiked);
      setIsSaved(result?.data?.isSaved);
      return result;
    },
    {
      enabled: !!currentUser,
    }
    // query enables when currentUser is available
  );

  // saving in savedItems collection
  const handleRecipeSave = async () => {
    setIsSaved((prevState) => !prevState);

    const body = {
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      itemType: "Recipe", //need the first letter in capital because it's given as refPath in DB schema.
    };
    // if item already saved call delete action
    if (isSaved) {
      setOptionsLoading(true);

      await axios
        .delete(
          `${import.meta.env.VITE_BASEURL}/deleteSavedItem?itemId=${
            recipeDetail?._id
          }&userEmail=${currentUser?.email}`
        )
        .then(() => {
          setOptionsLoading(false);
          reloadIslikedAndIsSaved();
          //  setOpen and message for snackbar alert for save/unsave
          setSnackbarOpen((prev) => !prev);
          setMessage("Recipe unsaved");
        })
        .catch(() => {
          setOptionsLoading(false);
          reloadIslikedAndIsSaved();
        });
      return;
    }
    setOptionsLoading(true);

    await axios
      .post(
        `${import.meta.env.VITE_BASEURL}/saveNewItem/${recipeDetail?._id}`,
        body
      )
      .then(() => {
        setOptionsLoading(false);
        reloadIslikedAndIsSaved();
        setSnackbarOpen((prev) => !prev);
        setMessage("Recipe saved");
      })
      .catch(() => {
        setOptionsLoading(false);
        reloadIslikedAndIsSaved();
      });
  };

  const handleReaction = async () => {
    setIsLiked((prevState) => !prevState);
    // if item already liked calls dislike action
    if (isLiked) {
      const body = {
        userId: currentUser?._id,
        action: "dislike",
        actionFrom: "recipe",
      };
      await axios
        .patch(
          `${import.meta.env.VITE_BASEURL}/changeReaction/${recipeDetail?._id}`,
          body
        )
        .then(() => {
          recipeDetailRefetch();
        })
        .catch(() => {
          recipeDetailRefetch();
        });
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
        `${import.meta.env.VITE_BASEURL}/changeReaction/${recipeDetail?._id}`,
        body
      )
      .then(() => {
        recipeDetailRefetch();
      })
      .catch(() => {
        recipeDetailRefetch();
      });
  };

  if (error) {
    return <ErrorElement refetch={recipeDetailRefetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-20  mt-20  ">
      <DetailSkeleton itemType={"Recipe"} />
    </div>
  ) : (
    <div className="my-container lg:px-20 print:mx-12    text-colorTwo print:bg-bgColor">
      <ReactHelmet
        title={`${recipeDetail?.recipeName}_Morsel`}
        descriptionContent={recipeDetail?.description}
      ></ReactHelmet>
      {/* status changer for admin only */}
      {currentUser?.role === "admin" && (
        <StatusChanger
          itemId={recipeDetail?._id}
          creatorEmail={recipeDetail?.creatorInfo?.email}
          status={recipeDetail?.status}
          actionFor="recipe"
          actionFrom="detailPage"
          adminEmail={currentUser?.email}
          setOpen={setSnackbarOpen}
          setMessage={setMessage}
          recipeDetailRefetch={recipeDetailRefetch}
        />
      )}

      {/* this div below only print app name in print page it stays hidden normally */}
      <div className="print:block hidden mb-5">
        <h2 className="text-2xl  font-bold text-colorOne relative z-50">
          Morsel
        </h2>
      </div>
      {/* recipe detail container */}
      <div>
        {/* recipe info and creator info */}
        <div
          className="md:flex items-center justify-between
        "
        >
          {/* recipe images */}
          <div className="print:hidden md:w-[45%] h-[60vh] md:h-[50vh] overflow-hidden rounded-tl-xl  rounded-tr-xl md:rounded-xl select-none relative ">
            <span
              onClick={() => {
                setRecipeImageIndex((prev) => prev - 1);
              }}
              className={`${
                recipeImageIndex === 0 ? "hidden" : ""
              } absolute top-1/2 left-0 -translate-y-1/2 text-white cursor-pointer z-40`}
            >
              <ArrowBackIosOutlinedIcon />
            </span>
            {recipeDetail?.recipeImages?.map((image, index) => (
              <img
                key={index}
                className={`object-cover absolute inset-0 h-full w-full transition-opacity duration-300 ease-linear ${
                  recipeImageIndex === index ? "opacity-100" : "opacity-0"
                }`}
                src={image}
                alt=""
              />
            ))}
            <span
              onClick={() => {
                setRecipeImageIndex((prev) => prev + 1);
              }}
              className={`${
                recipeImageIndex === recipeDetail?.recipeImages?.length - 1
                  ? "hidden"
                  : ""
              } absolute top-1/2 right-0 -translate-y-1/2 text-white cursor-pointer z-40`}
            >
              <ArrowForwardIosOutlinedIcon />
            </span>
          </div>
          {/* recipe & creator info */}
          <div className=" md:mt-1 flex-grow text-center print:text-left bg-bgColor -mt-4 relative z-20 rounded-3xl ">
            {/* edit  delete share button (creator only action) */}
            <div className="print:hidden flex gap-5 items-center justify-end  pt-2 mr-4 md:mr-0 lg:mb-4">
              {user?.email === recipeDetail?.creatorInfo?.email && (
                <>
                  <Tooltip title="Edit">
                    <Link
                      to={`/recipe/edit/${recipeDetail?._id}`}
                      className="cursor-pointer p-1"
                    >
                      <DriveFileRenameOutlineOutlinedIcon
                        sx={{ color: "#4B5365", fontSize: 30 }}
                      />
                    </Link>
                  </Tooltip>
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
                </>
              )}
            </div>
            {/* recipe name */}
            <h1 className="text-3xl md:text-5xl font-bold ">
              {recipeDetail?.recipeName}
            </h1>

            <div className="flex items-center gap-1 justify-center print:justify-start ">
              <h3 className="text-lg ">
                By{" "}
                <span className="text-base">
                  {recipeDetail?.creatorInfo?.name || "Morsel creator"}
                </span>
              </h3>
            </div>

            {/* like button */}
            <div className="print:hidden  mt-1 ">
              {isLikedAndSavedLoading ? (
                <p>
                  <FavoriteBorderOutlinedIcon
                    sx={{ opacity: "0.4", fontSize: 28 }}
                  />
                </p>
              ) : (
                <p className="flex-grow">
                  <button
                    disabled={optionsLoading}
                    onClick={handleReaction}
                    className="cursor-pointer "
                  >
                    {isLiked ? (
                      <FavoriteOutlinedIcon
                        sx={{ color: "red", fontSize: 28 }}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        sx={{ color: "#4B5365", fontSize: 28 }}
                      />
                    )}
                  </button>{" "}
                  {recipeDetail?.likedBy?.length}
                </p>
              )}
            </div>
            {/* description */}
            <div className="mt-3">
              <p className="text-xl">{recipeDetail?.description}</p>
            </div>
            {/* save, print button */}
            <div className="print:hidden mt-8">
              <div className=" flex items-center justify-center gap-8  text-lg">
                {isLikedAndSavedLoading ? (
                  <div className="w-fit opacity-40">
                    <BookmarkBorderOutlinedIcon
                      sx={{ color: "#4B5365", fontSize: 28 }}
                    />
                    <span>Save</span>
                  </div>
                ) : (
                  <button disabled={optionsLoading} onClick={handleRecipeSave}>
                    {isSaved ? (
                      <>
                        <BookmarkOutlinedIcon
                          sx={{ color: "#4B5365", fontSize: 28 }}
                        />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <BookmarkBorderOutlinedIcon
                          sx={{ color: "#4B5365", fontSize: 28 }}
                        />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => {
                    window.print();
                  }}
                >
                  <LocalPrintshopOutlinedIcon
                    sx={{ color: "#4B5365", fontSize: 28 }}
                  />

                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    setDialogFor("shareOptions");
                    setDeleteAlertOpen((prev) => !prev);
                  }}
                >
                  <ShareOutlinedIcon sx={{ color: "#4B5365", fontSize: 28 }} />{" "}
                  Share
                </button>
              </div>
            </div>

            <div className="absolute -top-6 left-3">
              <StatusAndFeedback
                status={recipeDetail?.status}
                feedback={recipeDetail?.feedback}
              />
            </div>
          </div>
        </div>

        {/* recipe body */}
        <div className="mt-10 space-y-4">
          {/* cooktime preptime servings */}
          <div className="md:w-3/4 lg:w-1/2  flex print:gap-5 items-center  justify-between print:justify-normal">
            <div className=" flex items-center">
              <p className="text-lg font-semibold">Prep time :</p>
              <p className="space-x-2">
                <span>
                  {recipeDetail?.prepTime?.hours
                    ? `${recipeDetail?.prepTime?.hours} hours`
                    : ""}
                </span>
                <span>
                  {recipeDetail?.prepTime?.minutes
                    ? `${recipeDetail?.prepTime?.minutes} minutes`
                    : "0"}
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-semibold">Cook time :</p>
              <p className="space-x-2">
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
          </div>

          {/* ingredients */}
          <div>
            <div className="md:w-4/5 lg:w-1/2 flex   items-center gap-32 justify-between  print:justify-normal">
              <h1 className="text-3xl ">Ingredients</h1>
              <div className=" flex gap-2 items-center  ">
                <p className="text-lg font-semibold">Serves</p>
                <p>{recipeDetail?.serving}</p>
              </div>
            </div>

            {recipeDetail?.ingredients?.map((ingredient, index) => (
              <p key={index} className="text-xl">
                {ingredient}
              </p>
            ))}
          </div>
          {/* instructions */}
          <div className="">
            <div className="">
              <h1 className="text-3xl">Instructions</h1>
            </div>

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

      <SimpleSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={message}
      />
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
