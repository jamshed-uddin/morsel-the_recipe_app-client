import useRecipesBlogsData from "../../hooks/useRecipesBlogsData";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const NotificationDialog = ({ handleClose }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [itemPerPage] = useState(5);
  const { notifications, notificationRefetch } = useRecipesBlogsData();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuthContext();

  const clearNotifications = async () => {
    setDeleteLoading(true);
    await axios
      .delete(
        `${import.meta.env.VITE_BASEURL}deleteMyNotification/${user?.email}`
      )
      .then((res) => {
        console.log(res);
        notificationRefetch();
        setDeleteLoading(false);
      })
      .catch((err) => {
        console.log(err);
        notificationRefetch();
        setDeleteLoading(false);
      });
  };

  return (
    <div className=" text-colorTwo p-4 md:p-6  flex flex-col h-[60vh] md:h-[70vh] relative">
      {deleteLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircularProgress size={80} color="warning" />
        </div>
      ) : null}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-3xl font-semibold" id="alert-dialog-title">
            Notifications
          </h3>
        </div>
        <div>
          <button onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </button>
        </div>
      </div>
      <div className="flex-grow text-xl md:text-2xl divide-y-[1px] space-y-7 my-2">
        {notifications?.length ? (
          notifications
            ?.slice(
              pageIndex * itemPerPage - itemPerPage,
              pageIndex * itemPerPage
            )
            .map((notification) => (
              <div onClick={handleClose} key={notification._id}>
                <Link
                  to={`/${notification.notificationFor}/detail/${notification.itemId}`}
                >
                  <p className="flex gap-2 items-center">
                    <span className="inline">
                      {notification.text.includes("approved") ? (
                        <GppGoodOutlinedIcon
                          sx={{ color: "green", fontSize: 35 }}
                        />
                      ) : (
                        <GppMaybeOutlinedIcon
                          sx={{ color: "red", fontSize: 35 }}
                        />
                      )}
                    </span>
                    <span>
                      {notification.text}
                      <b>See {notification.notificationFor} detail</b>
                    </span>
                  </p>
                  {/* <p>{Date(notification.time).toString()}</p> */}
                </Link>
              </div>
            ))
        ) : (
          <div className="py-4">
            <h1>Welcome to Notification.</h1>
            <p className="text-xl">
              You have no recent activity yet.Try{" "}
              <b>
                <Link onClick={handleClose} to={"/addrecipe"}>
                  creating a recipe.
                </Link>
              </b>
            </p>
          </div>
        )}
      </div>
      {notifications?.length ? (
        <div className="flex justify-between items-center py-4">
          <div>
            <button onClick={clearNotifications} className="text-lg font-bold">
              Clear all
            </button>
          </div>
          <div className="space-x-6">
            <button
              disabled={pageIndex === 1}
              className={`${pageIndex === 1 ? "opacity-40" : ""}`}
              onClick={() => {
                setPageIndex((prev) => prev - 1);
              }}
            >
              <ArrowBackIosOutlinedIcon />
            </button>
            <button
              disabled={pageIndex * itemPerPage >= notifications?.length}
              className={`${
                pageIndex * itemPerPage >= notifications?.length
                  ? "opacity-40"
                  : ""
              }`}
              onClick={() => {
                setPageIndex((prev) => prev + 1);
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationDialog;
