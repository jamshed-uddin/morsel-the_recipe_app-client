import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StatusAndFeedback = ({ status, feedback }) => {
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <>
      {status === "approved" && feedback && (
        <div className="print:hidden flex justify-end -mb-4 relative z-40 ">
          <div className=" text-white text-lg font-semibold bg-colorOne px-3  rounded-xl flex items-center relative">
            {/* status and toggler */}
            <div className="">
              {status}
              {/* toggler only available if there is any feedback */}
              {feedback && (
                <span
                  onClick={() => setOpenFeedback((p) => !p)}
                  className={`cursor-pointer `}
                >
                  <ExpandMoreIcon
                    sx={
                      openFeedback ? { rotate: "180deg" } : { rotate: "0deg" }
                    }
                  />
                </span>
              )}
            </div>
            {/* feedback body */}
            <div
              className={`${
                openFeedback
                  ? "absolute h-fit w-[14rem] top-[2rem] px-2 py-[3px] left-0 bg-colorOne rounded-xl leading-5 font-light block text-left"
                  : "hidden"
              }`}
            >
              {feedback}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusAndFeedback;
