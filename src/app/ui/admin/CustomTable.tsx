import NoRowOverlay from "@/app/ui/admin/NoRowOverlay";
import LinearProgress from "@mui/material/LinearProgress";
import {DataGrid, GridToolbar, GridRowSpacingParams} from "@mui/x-data-grid";
import * as React from "react";
import {CustomTableProps} from "@/app/lib/definitions";

const CustomTable = ({rows, columns, isLoading}: CustomTableProps) => {

    const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <DataGrid
            sx={{
                minHeight: 300
            }}
            rows={rows}
            columns={columns}
            getRowSpacing={getRowSpacing}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            slots={{
                noRowsOverlay: NoRowOverlay,
                loadingOverlay: LinearProgress,
                toolbar: GridToolbar
            }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true
                }
            }}
            loading={isLoading}
            // checkboxSelection
            // disableRowSelectionOnClick
            disableDensitySelector
            disableColumnSelector
            // autoPageSize
            // showColumnVerticalBorder
            // showCellVerticalBorder
        />
    );
};

export default CustomTable;