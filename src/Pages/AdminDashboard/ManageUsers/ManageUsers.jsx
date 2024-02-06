import { Avatar } from "@mui/material";
import { useMemo } from "react";

import TableComponent from "../TableComponent";
import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";
import UserActions from "./UserActions";

import ErrorElement from "../../../Components/ErrorElement";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading: userFetchLoading,
    data: userData,
    error: userFetchError,
    refetch: usersRefetch,
  } = useQuery(["users"], async () => {
    try {
      const result = await axiosSecure.get(`/users`);
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

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
        field: "actions",
        headerName: "Change role",
        width: "300",
        type: "actions",
        renderCell: (params) => (
          <UserActions {...{ params, usersRefetch }}></UserActions>
        ),
      },
    ],
    []
  );

  if (userFetchError) {
    return <ErrorElement error={userFetchError} />;
  }

  if (userFetchLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
      <ReactHelmet title={`Manage user | Dashboard - Morsel`} />
      <Toaster />
      <div>
        <TableComponent columns={columns} data={userData || []} />
      </div>
    </div>
  );
};

export default ManageUsers;
