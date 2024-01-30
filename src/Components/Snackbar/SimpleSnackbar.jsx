import Snackbar from "@mui/material/Snackbar";

const SimpleSnackbar = ({ open, setOpen, message }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      />
    </div>
  );
};

export default SimpleSnackbar;
