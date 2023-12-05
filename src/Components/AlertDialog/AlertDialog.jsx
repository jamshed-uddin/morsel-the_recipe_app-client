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

  const handleClose = () => {
    setOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setSnackbarOpen(true);
      console.log("text copied ");
    } catch (error) {
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
        {dialogFor === "delete" && (
          <div className="bg-bgColor text-colorTwo">
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
                Also be deleted from saved item!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="border-2 border-colorOne text-lg px-3 py-1 rounded-lg"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-colorOne border-2 border-colorOne text-white text-lg px-3 py-1 rounded-lg "
                onClick={handleClose}
              >
                Delete
              </button>
            </DialogActions>
          </div>
        )}

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
              message={"Link copied to clipboard"}
            />
          </div>
        )}
      </Dialog>
    </>
  );
};

export default AlertDialog;
