import { useMemo, useState } from "react";
import TableComponent from "../TableComponent";

import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";

import useDashboardContext from "../../../hooks/useDashboardContext";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";
import StatusChanger from "../../../Components/StatusChanger/StatusChanger";
import useSingleUser from "../../../hooks/useSingleUser";

const ManageRecipes = () => {
  const { recipesData, recipesFetchLoading } = useDashboardContext();

  console.log(recipesData);
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
          />
        ),
      },
    ],
    [currentUser]
  );

  if (recipesFetchLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
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
