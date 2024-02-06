import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import useSingleUser from "../../../hooks/useSingleUser";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserActions = ({ params, usersRefetch }) => {
  const { currentUser } = useSingleUser();
  const [loading, setLoading] = useState(false);
  const [updatedRole, setUpdatedRole] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    setUpdatedRole(e.target.value);
  };

  const handleRoleChange = async () => {
    setLoading(true);

    try {
      await axiosSecure.patch(`/updateRole/${currentUser?.email}`, {
        role: updatedRole,
        userEmail: params.row.email,
      });

      toast.success("Role changed");
      setLoading(false);
      usersRefetch();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <FormControl sx={{ minWidth: "100px" }}>
        <Select
          sx={{ height: 45 }}
          value={updatedRole}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={""} disabled>
            {params.row.role}
          </MenuItem>
          <MenuItem value={"creator"}>Creator</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <div className="relative">
        <button
          onClick={handleRoleChange}
          disabled={params.row.role === updatedRole || !updatedRole || loading}
          className={`bg-colorOne text-white px-4 py-1 text-lg rounded-lg ${
            (params.row.role === updatedRole || !updatedRole) && "opacity-70"
          }`}
        >
          Save
        </button>
        <div className="absolute -right-9 top-1">
          {loading && <CircularProgress size={30} sx={{ color: "#F31559" }} />}
        </div>
      </div>
    </div>
  );
};

export default UserActions;
