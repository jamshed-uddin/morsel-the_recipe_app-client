import { useMemo, useState } from "react";
import TableComponent from "../TableComponent";

import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";

import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";
import StatusChanger from "../../../Components/StatusChanger/StatusChanger";
import useSingleUser from "../../../hooks/useSingleUser";
import useDashboardData from "../../../hooks/useDashboardData";
import ErrorElement from "../../../Components/ErrorElement";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";

const ManageRecipes = () => {
  const {
    data: recipesData,
    refetch: recipesRefetch,
    isLoading: recipesLoading,
    error: recipesError,
  } = useDashboardData("/allRecipes");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { currentUser } = useSingleUser();
  const snackbarHandler = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        field: "recipeName",
        headerName: "Recipe name",
        width: "300",
        editable: false,
      },
      {
        field: "creatorInfo.email",
        headerName: "Creator email",
        width: "220",
        editable: false,
        filterable: false,
        valueGetter: (params) => params.row?.creatorInfo?.email,
      },

      {
        field: "actions",
        headerName: "Change status | See detail",
        width: "470",
        type: "actions",
        renderCell: (params) => (
          <StatusChanger
            itemId={params.row._id}
            creatorEmail={params.row?.creatorInfo?.email}
            status={params.row.status}
            actionFor="recipe"
            actionFrom="table"
            adminEmail={currentUser?.email}
            snackbarHandler={snackbarHandler}
            refetch={recipesRefetch}
          />
        ),
      },
    ],
    [currentUser?.email, recipesRefetch]
  );

  if (recipesError) {
    return (
      <ErrorElement
        error={recipesError}
        refetch={recipesRefetch}
      ></ErrorElement>
    );
  }

  if (recipesLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
      <ReactHelmet title={`Manage recipes | Dashboard - Morsel`} />
      <div>
        <TableComponent columns={columns} data={recipesData || []} />
      </div>
      <SimpleSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageRecipes;
