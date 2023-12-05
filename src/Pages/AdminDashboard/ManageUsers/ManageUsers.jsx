import { Avatar } from "@mui/material";
import { useMemo, useState } from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";
import TableComponent from "../TableComponent";
import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";
import UserActions from "./UserActions";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";

const ManageUsers = () => {
  const { userData, userFetchLoading } = useDashboardContext();
  const [rowId, setRowId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const snackbarHandler = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        field: "photo",
        headerName: "Photo",
        width: "70",
        renderCell: (params) => <Avatar src={params.row.photoURL}></Avatar>,
        sortable: false,
        editable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: "180", editable: false },
      {
        field: "email",
        headerName: "User email",
        width: "220",
        editable: false,
        filterable: false,
      },
      {
        field: "role",
        headerName: "Role(Editable)",
        width: "130",
        type: "singleSelect",
        valueOptions: ["creator", "admin"],
        editable: true,
      },
      {
        field: "actions",
        headerName: "Change role",
        width: "200",
        type: "actions",
        renderCell: (params) => (
          <UserActions
            {...{ params, rowId, setRowId, snackbarHandler }}
          ></UserActions>
        ),
      },
    ],
    [rowId]
  );

  if (userFetchLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
      <div>
        <TableComponent
          setRowId={setRowId}
          columns={columns}
          data={userData || []}
        />
      </div>
      <SimpleSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageUsers;
