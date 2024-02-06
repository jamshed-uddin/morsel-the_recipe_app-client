import { useMemo, useState } from "react";
import TableComponent from "../TableComponent";
import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";
import StatusChanger from "../../../Components/StatusChanger/StatusChanger";
import useSingleUser from "../../../hooks/useSingleUser";
import useDashboardData from "../../../hooks/useDashboardData";
import ErrorElement from "../../../Components/ErrorElement";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";

const ManageBlogs = () => {
  const {
    data: blogsData,
    refetch: blogsRefetch,
    isLoading: blogsLoading,
    error: blogsError,
  } = useDashboardData("/allBlogs");

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
            creatorEmail={params.row?.creatorInfo?.email}
            status={params.row.status}
            actionFor="blog"
            actionFrom="table"
            adminEmail={currentUser?.email}
            snackbarHandler={snackbarHandler}
            refetch={blogsRefetch}
          />
        ),
      },
    ],
    [currentUser, blogsRefetch]
  );

  if (blogsError) {
    return <ErrorElement error={blogsError} refetch={blogsRefetch} />;
  }

  if (blogsLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="">
      <ReactHelmet title={`Manage blogs | Dashboard - Morsel`} />

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
