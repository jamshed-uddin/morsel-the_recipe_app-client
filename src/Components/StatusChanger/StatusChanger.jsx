import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const StatusChanger = ({
  status,
  creatorEmail,
  itemId,
  adminEmail,
  actionFrom,
  actionFor,
  refetch,
  //info about props at the end of the code
}) => {
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      await axiosSecure.patch(
        `/${
          actionFor === "blog" ? "updateBlogStatus" : "updateRecipeStatus"
        }/${adminEmail}`,
        {
          status: updatedStatus,
          creatorEmail,
          ...(updatedStatus === "denied"
            ? { feedback: feedback }
            : { feedback: "" }),
          ...(actionFor === "blog" ? { blogId: itemId } : { recipeId: itemId }),
        }
      );
      setLoading(false);
      handleClose();
      setFeedback("");

      // snackbar and refetch for table
      if (actionFrom === "table") {
        refetch();
        toast.success("Status changed");

        return;
      }

      toast.success("Status changed");

      refetch();
    } catch (error) {
      setLoading(false);
      handleClose();
      setFeedback("");

      // snackbar and refetch for table
      if (actionFrom === "table") {
        refetch();
        toast.error(error?.response?.data?.error);

        return;
      }

      toast.error(error?.response?.data?.error);
      refetch();
    }
  };

  return (
    <div
      className={`print:hidden text-colorTwo ${
        actionFrom === "table"
          ? ""
          : "py-2 shadow-lg mt-1 mb-4 rounded-xl px-4 flex justify-center"
      }`}
    >
      <div className="flex items-center ">
        <div className=" flex items-center gap-2">
          {actionFrom === "table" ? (
            <h1 className=" ">Status</h1>
          ) : (
            <h1 className="text-2xl ">Current status</h1>
          )}
          <FormControl sx={{ minWidth: "100px" }}>
            <Select
              sx={{ height: 45 }}
              value={updatedStatus}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""} disabled>
                {status}
              </MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Approved</MenuItem>
              <MenuItem value={"denied"}>Denied</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className=" ml-4">
          {updatedStatus === "denied" ? (
            <div>
              <button
                onClick={handleClickOpen}
                className="bg-colorOne text-white px-3 py-1 text-lg rounded-lg "
              >
                Feedback
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={handleStatusChange}
                disabled={loading || updatedStatus === status || !updatedStatus}
                className={`bg-colorOne text-white px-5 py-1 text-lg rounded-lg ${
                  (loading || updatedStatus === status || !updatedStatus) &&
                  "opacity-70"
                }`}
              >
                Save
              </button>
              <div className="absolute right-6 top-1">
                {loading && (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* detail button only when in table */}
        {actionFrom === "table" && (
          <div>
            <Link
              to={`/${
                actionFor === "recipe" ? "recipe" : "blog"
              }/detail/${itemId}`}
            >
              <p className="bg-colorOne text-white px-4 py-1 text-lg rounded-lg ml-4">
                Detail
              </p>
            </Link>
          </div>
        )}
      </div>

      {/* dialog for admin feedback */}
      <div className="text-colorTwo">
        <Dialog fullWidth open={dialogOpen} onClose={handleClose}>
          <div className="ml-7 mt-5">
            <h1 className="text-3xl mb-1">Leave a feedback</h1>
            <div className="text-lg leading-6">
              <h3 className="text-2xl"> Mention</h3>
              <p>- The reason for denial</p>
              <p>- Corrections</p>
              <p>- Suggestions</p>
            </div>
          </div>
          <DialogContent>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "0 20px 20px 0" }}>
            <button
              onClick={() => {
                handleClose();
                setFeedback("");
              }}
              disabled={loading}
              className={` border-2 border-colorOne px-5 py-1 text-xl rounded-lg `}
            >
              Cancel
            </button>
            <div className="relative">
              <button
                onClick={handleStatusChange}
                disabled={loading || !feedback}
                className={`bg-colorOne text-white border-2 border-colorOne px-5 py-1 text-xl rounded-lg ${
                  (loading || !feedback) && "opacity-70"
                }`}
              >
                Save
              </button>
              <div className="absolute right-6 top-1">
                {loading && (
                  <CircularProgress size={30} sx={{ color: "#4B5365" }} />
                )}
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default StatusChanger;

/*

using this statusChanger in 4 places..
* ManageBlogs table
* ManageRecipes table
* blog detail
* recipe detail

props
  * status - current status of blog/recipe
  * itemId - unique id of blog/recipe
  * adminEmail - currentUser id which has to be a admin email
  * actionFrom -  (table/ detailPage) as it's used in 2 different  types of page 
  * actionFor - blog/recipe - as they have different api for updating
  
 * refetch -- useQuery refetch to refetch data after a change in status

*/
