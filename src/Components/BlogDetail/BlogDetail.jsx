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

import { useEffect, useState } from "react";
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

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [blogDetail, setBlogDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogFor, setDialogFor] = useState("delete");
  const { currentUser } = useSingleUser();
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const {
    isLoading,
    data,
    error,
    refetch: blogDetailRefetch,
  } = useQuery("blogDetail", async () => {
    const result = axios.get(`${import.meta.env.VITE_BASEURL}singleBlog/${id}`);
    return result;
  });

  useEffect(() => {
    if (data) {
      setBlogDetail(data.data);
    }
  }, [data]);

  // console.log(data);

  const {
    isLoading: isLikedAndSavedLoading,
    data: isLikedAndSaved,
    error: errorMessage,
    refetch: reloadIslikedAndIsSaved,
  } = useQuery(
    "isSavedAndLiked",
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}isLikedAndSaved?userEmail=${
          currentUser?.email
        }&itemId=${blogDetail?._id}&itemType=blog`
      );
      setIsLiked(result?.data?.isLiked);
      setIsSaved(result?.data?.isSaved);
      return result;
    },
    { enabled: !!currentUser } // query enables when currentUser is available
  );

  // saving on savedItems collection
  const handleBlogSave = async () => {
    setIsSaved((prevState) => !prevState);

    const body = {
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      itemType: "Blog", //need the first letter in capital because it's given as refPath in DB schema.
    };
    // if item already saved call delete action
    if (isSaved) {
      setOptionsLoading(true);

      await axios
        .delete(
          `${import.meta.env.VITE_BASEURL}deleteSavedItem?itemId=${
            blogDetail?._id
          }&userEmail=${currentUser?.email}`
        )
        .then(() => {
          setOptionsLoading(false);
          reloadIslikedAndIsSaved();
          //  setOpen and message for snackbar alert for save/unsave
          setOpen((prev) => !prev);
          setMessage("Blog unsaved");
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
        `${import.meta.env.VITE_BASEURL}saveNewItem/${blogDetail?._id}`,
        body
      )
      .then(() => {
        setOptionsLoading(false);
        reloadIslikedAndIsSaved();
        setOpen((prev) => !prev);
        setMessage("Blog saved");
      })
      .catch((err) => {
        setOptionsLoading(false);
        console.log(err);
      });
  };

  const handleReaction = async () => {
    setIsLiked((prevState) => !prevState);

    // if item already liked calls dislike action
    if (isLiked) {
      const body = {
        userId: currentUser?._id,
        action: "dislike",
        actionFrom: "blog",
      };
      await axios
        .patch(
          `${import.meta.env.VITE_BASEURL}changeReaction/${blogDetail?._id}`,
          body
        )
        .then((result) => {
          console.log(result);
          blogDetailRefetch();
        })
        .catch((err) => console.log(err));
      return;
    }

    // if item not liked yet
    const body = {
      userId: currentUser?._id,
      action: "like",
      actionFrom: "blog",
    };
    await axios
      .patch(
        `${import.meta.env.VITE_BASEURL}changeReaction/${blogDetail?._id}`,
        body
      )
      .then((result) => {
        console.log(result);

        blogDetailRefetch();
      })
      .catch((err) => console.log(err));
  };

  if (error) {
    return <ErrorElement blogDetailRefetch={blogDetailRefetch} />;
  }

  return isLoading ? (
    <div className="my-container lg:px-20 ">
      <DetailSkeleton itemType={"Blog"} />
    </div>
  ) : (
    <div className="my-container lg:px-20   text-colorTwo">
      {/* blog & creator info */}

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
          blogDetailRefetch={blogDetailRefetch}
        />
      )}

      {/* blog sections starts */}
      <div className="space-y-5 ">
        <div className="w-fit">
          <StatusAndFeedback
            status={blogDetail?.status}
            feedback={blogDetail?.feedback}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">{blogDetail?.title}</h1>
        <div className="flex items-center gap-1">
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={
              blogDetail?.creatorInfo?.photoURL ||
              "https://i.ibb.co/Twp960D/default-profile-400x400.png"
            }
          />
          <h3 className="text-[1.40rem] ">{blogDetail?.creatorInfo?.name}</h3>
        </div>
        <div className="flex justify-between ">
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
