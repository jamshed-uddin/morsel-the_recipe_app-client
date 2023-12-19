import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CloseIcon from "@mui/icons-material/Close";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useState } from "react";
import SimpleSnackbar from "../Snackbar/SimpleSnackbar";
import MyButton from "../Button/MyButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useRecipesBlogsData from "../../hooks/useRecipesBlogsData";

const AlertDialog = ({
  open,
  setOpen,
  itemType,
  dialogFor,
  shareURL,
  itemId,
  userEmail,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const { notifications } = useRecipesBlogsData();

  const handleClose = () => {
    setOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setSnackbarOpen(true);
      setSnackbarMessage("Linked copied to clipboard");
      console.log("text copied ");
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BASEURL}${
          itemType === "recipe" ? "deleteRecipe" : "deleteBlog"
        }?userEmail=${userEmail}&itemId=${itemId}`
      );

      setDeleteLoading(false);
      navigate(-1);
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage("Something went wrong");
      setDeleteLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* dialog for deleting items */}
        {dialogFor === "delete" && (
          <div className="bg-bgColor text-colorTwo md:px-5 py-3">
            <DialogTitle id="alert-dialog-title">
              {"Confirm delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {` Are you sure you want to delete this ${itemType}?`}
              </DialogContentText>
              <DialogContentText
                sx={{
                  padding: "7px 2px",
                  marginTop: "5px",
                  borderLeft: "3px solid #F31559",
                  borderRadius: "4px",
                  color: "#F31559",
                  fontSize: "14px",
                }}
                id="alert-dialog-description"
              >
                Also be deleted from saved items!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MyButton variant={"outlined"} clickFunction={handleClose}>
                Cancel
              </MyButton>

              <MyButton
                loading={deleteLoading}
                clickFunction={handleItemDelete}
              >
                Delete
              </MyButton>
            </DialogActions>
          </div>
        )}

        {/* dialog for share options */}
        {dialogFor === "shareOptions" && (
          <div className="text-colorTwo mb-5">
            <DialogContent>
              <div className="text-end ">
                <button onClick={handleClose}>
                  <CloseIcon />
                </button>
              </div>
              <div>
                <h2 className="text-3xl">{`Share ${itemType}`}</h2>
              </div>
              <div className="flex gap-7 flex-wrap mt-4">
                <div className="text-center">
                  <button
                    onClick={copyLink}
                    className="border-2 border-[#4B5365] rounded-full px-[0.6rem] py-2 mb-2"
                  >
                    <LinkOutlinedIcon />
                  </button>
                  <p>Copy link</p>
                </div>
                <div className="text-center ">
                  <FacebookShareButton url={shareURL}>
                    <FacebookIcon size={45} round />
                  </FacebookShareButton>
                  <p>Facebook</p>
                </div>
                <div className="text-center">
                  <TwitterShareButton url={shareURL}>
                    <TwitterIcon size={45} round />
                  </TwitterShareButton>
                  <p>Twitter/X</p>
                </div>
                <div className="text-center">
                  <WhatsappShareButton url={shareURL}>
                    <WhatsappIcon size={45} round />
                  </WhatsappShareButton>
                  <p>Whatsapp</p>
                </div>
                <div className="text-center">
                  <TelegramShareButton url={shareURL}>
                    <TelegramIcon size={45} round />
                  </TelegramShareButton>
                  <p>Telegram</p>
                </div>

                <div className="text-center">
                  <EmailShareButton
                    url={shareURL}
                    subject={`A wonderfull ${itemType}`}
                  >
                    <EmailIcon size={45} round />
                  </EmailShareButton>
                  <p>Email</p>
                </div>
              </div>
            </DialogContent>
            <SimpleSnackbar
              open={snackbarOpen}
              setOpen={setSnackbarOpen}
              message={snackbarMessage}
            />
          </div>
        )}

        {/* dialog for notification */}
        {dialogFor === "notifications" && (
          <div className="bg-bgColor text-colorTwo p-4 md:p-6  flex flex-col h-[60vh] md:h-[70vh] ">
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
              {notifications?.map((notification) => (
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
                  </Link>
                </div>
              ))}
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
            </div>
            <div className="flex justify-between items-center py-4">
              <div>Clear all</div>
              <div className="space-x-3">
                <button>Previous</button>
                <button>Next</button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default AlertDialog;
