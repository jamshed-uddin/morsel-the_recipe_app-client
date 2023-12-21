import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import useSingleUser from "../../../hooks/useSingleUser";
import useDashboardContext from "../../../hooks/useDashboardContext";

const UserActions = ({ params, rowId, setRowId, snackbarHandler }) => {
  const { currentUser } = useSingleUser();
  const [loading, setLoading] = useState(false);
  const { setUsersRefetch } = useDashboardContext();
  const handleRoleChange = async () => {
    setRowId(params.row._id);

    setLoading(true);

    try {
      await axios.patch(
        `${import.meta.env.VITE_BASEURL}/updateRole/${currentUser?.email}`,
        { role: params.row.role, userEmail: params.row.email }
      );

      snackbarHandler("Role changed");

      setLoading(false);
      setRowId(null);
      setUsersRefetch((prev) => !prev);
    } catch (error) {
      snackbarHandler(error?.response?.data?.error);
      setLoading(false);
      setRowId(null);
      setUsersRefetch((prev) => !prev);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleRoleChange}
          disabled={params.row._id !== rowId || loading}
          className={`bg-colorOne text-white px-4 py-1 text-lg rounded-lg ${
            params.row._id !== rowId && "opacity-70"
          }`}
        >
          Save
        </button>
        <div className="absolute -right-9 top-1">
          {loading && <CircularProgress size={30} sx={{ color: "#F31559" }} />}
        </div>
      </div>
    </>
  );
};

export default UserActions;
