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
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ErrorElement from "../ErrorElement";
import DetailSkeleton from "../../Components/Skeletons/DetailSkeleton";
import { Tooltip } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import useSingleUser from "../../hooks/useSingleUser";
import AlertDialog from "../AlertDialog/AlertDialog";
import StatusChanger from "../StatusChanger/StatusChanger";
import ReactHelmet from "../ReactHelmet/ReactHelmet";
import StatusAndFeedback from "../statusAndFeedback/statusAndFeedback";
import RecipeInstructions from "./RecipeInstructions";
import useSaveAndReact from "../../hooks/useSaveAndReact";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { currentUser } = useSingleUser();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [dialogFor, setDialogFor] = useState("delete");
  const [recipeImageIndex, setRecipeImageIndex] = useState(0);

  const {
    isLoading,
    data: recipeDetail,
    error,
    refetch: recipeDetailRefetch,
  } = useQuery(["recipeDetail", id], async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/singleRecipe/${id}`
      );
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const {
    isLiked,
    isSaved,
    isLikedAndSavedLoading,
    handleItemSave,
    handleReaction,
    optionsLoading,
  } = useSaveAndReact(
    "recipe",
    recipeDetail?._id,
    !!recipeDetail,
    recipeDetailRefetch
  );

  const handleRecipeSave = () => {
    handleItemSave();
  };
  const handleRecipeReaction = () => {
    handleReaction();
  };

  if (error) {
    return <ErrorElement error={error} refetch={recipeDetailRefetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-20  mt-20  ">
      <DetailSkeleton itemType={"Recipe"} />
    </div>
  ) : (
    <div className="my-container lg:px-20 print:text-justify text-colorTwo print:bg-bgColor tracking-tight">
      <ReactHelmet
        title={`${recipeDetail?.recipeName} - Morsel`}
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
          refetch={recipeDetailRefetch}
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
          className="md:flex gap-4 items-center 
        "
        >
          {/* recipe images */}
          <div className="print:hidden flex-grow h-[60vh] md:h-[55vh]">
            <div className="w-full h-full overflow-hidden rounded-tl-xl  rounded-tr-xl md:rounded-xl select-none relative ">
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
              {recipeDetail?.recipeImages &&
              recipeDetail?.recipeImages.length ? (
                recipeDetail?.recipeImages?.map((image, index) => (
                  <img
                    key={index}
                    className={`object-cover absolute inset-0 h-full w-full transition-opacity duration-300 ease-linear ${
                      recipeImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    src={image}
                    alt={`Images of ${recipeDetail.recipeName}`}
                  />
                ))
              ) : (
                <img
                  className={`object-cover  h-full w-full `}
                  src={
                    "https://res.cloudinary.com/dgrpadmpv/image/upload/v1705393896/img_files/mhb0nkouy6jydkk1yzgg.jpg"
                  }
                  alt={`Images of ${recipeDetail.recipeName}`}
                />
              )}
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
          </div>
          {/* recipe & creator info */}
          <div className="md:w-[42vw] md:mt-1   text-center print:text-left bg-bgColor -mt-4 relative z-20 rounded-3xl ">
            {/* edit  delete  button (creator only action) */}
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
            <h1 className="text-3xl md:text-5xl font-semibold ">
              {recipeDetail?.recipeName}
            </h1>

            <div className="flex items-center gap-1 justify-center print:justify-start ">
              <h3 className=" ">
                <span className="">By</span>{" "}
                <span className="text-lg font-medium hover:underline">
                  <Link to={`/account/${recipeDetail?.creatorInfo?._id}`}>
                    {recipeDetail?.creatorInfo?.name || "Morsel creator"}
                  </Link>
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
                    onClick={handleRecipeReaction}
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
            {/* save, print, share button */}
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

            {currentUser?.email === recipeDetail?.creatorInfo?.email && (
              <div className="absolute -top-6 left-3">
                <StatusAndFeedback
                  status={recipeDetail?.status}
                  feedback={recipeDetail?.feedback}
                />
              </div>
            )}
          </div>
        </div>

        {/* recipe body */}
        <div className="mt-8 space-y-6">
          {/* cooktime preptime servings */}
          <div className="md:w-3/4 lg:w-1/2  flex print:gap-5 items-center  justify-between print:justify-normal">
            <div className=" flex items-center">
              <p className="text-xl font-semibold">Prep time :</p>
              <p className="space-x-2 text-lg">
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
              <p className="text-xl font-semibold">Cook time :</p>
              <p className="space-x-2 text-lg">
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
            <div className="md:w-4/5 lg:w-1/2 flex   items-center gap-32 justify-between  print:justify-normal mb-2">
              <h1 className="text-3xl ">Ingredients</h1>
              <div className=" flex gap-2 items-center  ">
                <p className="text-lg font-semibold">Serves</p>
                <p>{recipeDetail?.serving}</p>
              </div>
            </div>

            <div className="">
              {recipeDetail?.ingredients?.map((ingredient, index) => (
                <p
                  key={index}
                  className={`text-xl ${ingredient.header ? "" : "mb-3"}`}
                >
                  {ingredient.header ? (
                    <span className="text-xl font-bold">
                      {ingredient.header}
                    </span>
                  ) : (
                    ingredient
                  )}
                </p>
              ))}
            </div>
          </div>
          {/* instructions */}
          <div>
            <div className="mb-2">
              <h1 className="text-3xl">Instructions</h1>
            </div>

            <RecipeInstructions instructions={recipeDetail?.instructions} />
          </div>
        </div>
      </div>

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
