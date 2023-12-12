import { CircularProgress } from "@mui/material";

const MyButton = ({
  children,
  loading,
  clickFunction,
  variant,
  type,
  disabledForOthers,
}) => {
  const normalStyle = `px-4 py-[0.2rem] rounded-xl bg-colorOne border-2 border-colorOne text-white text-xl ${
    loading || disabledForOthers ? "disabled" : ""
  }`;
  const outlinedStyle =
    "px-4 py-[0.2rem] rounded-xl  border-2 border-colorOne text-colorOne text-xl";

  return (
    <div className="w-fit rounded-xl relative inline mr-2 ">
      <button
        type={type}
        disabled={loading || disabledForOthers}
        onClick={clickFunction}
        className={
          (variant === "styleless" && "text-xl") ||
          (variant === "outlined" ? outlinedStyle : normalStyle)
        }
      >
        {children}
      </button>
      {loading ? (
        <p className="absolute top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <CircularProgress size={37} sx={{ color: "white" }} />
        </p>
      ) : null}
    </div>
  );
};

export default MyButton;
