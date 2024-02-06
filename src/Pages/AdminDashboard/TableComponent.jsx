import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableComponent = ({ columns, data }) => {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 30, 40]}
      ></DataGrid>
    </Box>
  );
};

export default TableComponent;
