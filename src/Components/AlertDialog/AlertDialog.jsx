import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CloseIcon from "@mui/icons-material/Close";

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
import { useNavigate } from "react-router-dom";

import NotificationDialog from "./NotificationDialog";

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

  const handleClose = () => {
    setOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setSnackbarOpen(true);
      setSnackbarMessage("Linked copied to clipboard");
    } catch (err) {
      return null;
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
          <NotificationDialog handleClose={handleClose} />
        )}
      </Dialog>
    </>
  );
};

export default AlertDialog;
