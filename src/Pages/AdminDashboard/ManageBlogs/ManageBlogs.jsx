import { useMemo, useState } from "react";
import TableComponent from "../TableComponent";

import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";

import useDashboardContext from "../../../hooks/useDashboardContext";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";

import StatusChanger from "../../../Components/StatusChanger/StatusChanger";
import useSingleUser from "../../../hooks/useSingleUser";

const ManageBlogs = () => {
  const { blogsData, blogsFetchLoading } = useDashboardContext();

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
        field: "title",
        headerName: "Blog title",
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
        width: "450",
        type: "actions",
        renderCell: (params) => (
          <StatusChanger
            itemId={params.row._id}
            status={params.row.status}
            actionFor="blog"
            actionFrom="table"
            adminEmail={currentUser?.email}
            snackbarHandler={snackbarHandler}
          />
        ),
      },
    ],
    [currentUser]
  );

  if (blogsFetchLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
      <div>
        <TableComponent columns={columns} data={blogsData || []} />
      </div>
      <SimpleSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageBlogs;
