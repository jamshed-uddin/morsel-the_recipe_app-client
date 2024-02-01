import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import axios from "axios";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import "./BlogDetail.css";

import { useState } from "react";
import { useQuery } from "react-query";
import { Avatar, Tooltip } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import DetailSkeleton from "../../Components/Skeletons/DetailSkeleton";
import ErrorElement from "../ErrorElement";
import { Link, useParams } from "react-router-dom";
import useSingleUser from "../../hooks/useSingleUser";
import SimpleSnackbar from "../Snackbar/SimpleSnackbar";

import AlertDialog from "../AlertDialog/AlertDialog";
import StatusChanger from "../StatusChanger/StatusChanger";
import StatusAndFeedback from "../statusAndFeedback/statusAndFeedback";
import ReactHelmet from "../ReactHelmet/ReactHelmet";
import toast from "react-hot-toast";
import useSaveAndReact from "../../hooks/useSaveAndReact";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogFor, setDialogFor] = useState("delete");
  const { currentUser } = useSingleUser();

  const {
    isLoading,
    data: blogDetail,
    error,
    refetch: blogDetailRefetch,
  } = useQuery(["blogDetail", id], async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/singleBlog/${id}`
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
  } = useSaveAndReact("blog", blogDetail?._id, !!blogDetail, blogDetailRefetch);

  const handleBlogSave = () => {
    handleItemSave();
  };
  const handleBlogReaction = () => {
    handleReaction();
  };

  if (error) {
    return <ErrorElement error={error} refetch={blogDetailRefetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-20 ">
      <DetailSkeleton itemType={"Blog"} />
    </div>
  ) : (
    <div className="my-container lg:px-20   text-colorTwo tracking-tight">
      <ReactHelmet title={`${blogDetail?.title}_Morsel`}></ReactHelmet>

      {/* status changer for admin only */}
      {currentUser?.role === "admin" && (
        <StatusChanger
          itemId={blogDetail?._id}
          creatorEmail={blogDetail?.creatorInfo?.email}
          status={blogDetail?.status}
          actionFor="blog"
          actionFrom="detailPage"
          adminEmail={currentUser?.email}
          setOpen={setOpen}
          setMessage={setMessage}
          refetch={blogDetailRefetch}
        />
      )}

      {/* blog sections starts */}
      <div className=" ">
        {currentUser?.email === blogDetail?.creatorInfo?.email && (
          <div className="w-fit">
            <StatusAndFeedback
              status={blogDetail?.status}
              feedback={blogDetail?.feedback}
            />
          </div>
        )}
        {/* blog & creator info */}
        <h1 className="text-3xl md:text-5xl font-semibold mt-5 leading-8">
          {blogDetail?.title}
        </h1>
        <div className=" mt-2">
          <Link to={`/account/${blogDetail?.creatorInfo?._id}`}>
            <div className="flex items-center gap-2">
              <div>
                <Avatar
                  sx={{ width: 30, height: 30, mb: 1 }}
                  src={
                    blogDetail?.creatorInfo?.photoURL ||
                    "https://i.ibb.co/Twp960D/default-profile-400x400.png"
                  }
                />
              </div>
              <div className="leading-6">
                <h3 className="text-[1.2rem] hover:underline">
                  {blogDetail?.creatorInfo?.name}
                </h3>
              </div>
            </div>
          </Link>

          <p className="font-light ml-10 ">
            {new Date(blogDetail?.createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}
          </p>
        </div>
        <div className="flex justify-between mt-5">
          {/* like and save button */}
          <div className="flex gap-6 md:gap-14 items-center">
            <div className="flex-grow">
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
                    onClick={handleBlogReaction}
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
                  {blogDetail?.likedBy?.length}
                </p>
              )}
            </div>
            <div>
              {isLikedAndSavedLoading ? (
                <div className="w-fit opacity-40">
                  <BookmarkBorderOutlinedIcon
                    sx={{ color: "#4B5365", fontSize: 28 }}
                  />
                  <span>Save</span>
                </div>
              ) : (
                <button disabled={optionsLoading} onClick={handleBlogSave}>
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
            </div>
          </div>
          {/* edit , share, options button */}
          <div className="flex gap-6 items-center">
            {user?.email === blogDetail?.creatorInfo?.email && (
              <Tooltip title="Edit">
                <Link
                  to={`/blog/edit/${blogDetail?._id}`}
                  className="cursor-pointer p-1"
                >
                  <DriveFileRenameOutlineOutlinedIcon
                    sx={{ color: "#4B5365", fontSize: 30 }}
                  />
                </Link>
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

            {user?.email === blogDetail?.creatorInfo?.email && (
              <Tooltip title="Delete">
                <button
                  onClick={() => {
                    setDialogFor("delete");
                    setDeleteAlertOpen((prev) => !prev);
                  }}
                  className="cursor-pointer p-1"
                >
                  <DeleteOutlinedIcon sx={{ color: "#4B5365", fontSize: 30 }} />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* blog body */}
      <div id="blog-body" className="mt-10 ">
        {HTMLReactParser(DOMPurify.sanitize(blogDetail?.blogBody))}
      </div>
      <SimpleSnackbar open={open} setOpen={setOpen} message={message} />
      <AlertDialog
        shareURL={"http://www.google.com"}
        dialogFor={dialogFor}
        open={deleteAlertOpen}
        setOpen={setDeleteAlertOpen}
        itemType={"blog"}
        itemId={blogDetail?._id}
        userEmail={currentUser?.email}
      />
    </div>
  );
};

export default BlogDetail;
