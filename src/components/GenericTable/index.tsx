import { DataGrid, DataGridProps } from "@mui/x-data-grid";

import NoData from "../../components/NoData";
import { tableStyle } from "./util";

export function GenericTable({ ...rest }: DataGridProps) {
  const noData = () => <NoData empty={true} />;
  return (
    <div style={{ minHeight: 500, width: "100%" }} data-testid="genericTable">
      <DataGrid
        slotProps={{
          pagination: {
            showFirstButton: true,
            showLastButton: true,
            labelRowsPerPage: "Items per page:",
          },
        }}
        slots={{
          noRowsOverlay: noData,
        }}
        rowSelection={false}
        disableColumnMenu
        disableRowSelectionOnClick
        loading={rest?.loading}
        sx={tableStyle}
        {...rest}
      />
    </div>
  );
}
