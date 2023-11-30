// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";

const SimpleSnackbar = ({ open, setOpen, message }) => {
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const action = (
  //   <>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </>
  // );

  return (
    <div>
      <Snackbar
        ContentProps={{
          sx: {
            background: "#4B5365",
            borderRadius: "20px",

            display: "grid",
            placeItems: "center",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        // action={action}
      />
    </div>
  );
};

export default SimpleSnackbar;
