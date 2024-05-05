"use client";

import NoRowOverlay from "@/app/ui/admin/NoRowOverlay";
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridPaginationModel,
    GridRowSpacingParams,
    GridSortModel,
    GridToolbar
} from "@mui/x-data-grid";
import {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from "react";
import {
    ADMIN_TABLE_SORT_FIELD_TYPE,
    AdminTableData,
    AdminTableLoadComponentType,
    AdminTableProps,
    AdminTableTabName,
    AllData,
    AllDataAdminTableDataApiResponse,
    Genre,
    GenreAdminTableDataApiResponse,
    Movies,
    MoviesAdminTableDataApiResponse,
    TablePaginationType,
    Theme,
    ThemeAdminTableDataApiResponse,
    WebSeries,
    WebSeriesAdminTableDataApiResponse
} from "@/app/lib/definitions";
import {Box, Button, ButtonGroup, Rating, Skeleton, Tooltip, Typography} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {fetchAdminTableData} from "@/app/ui/admin/fetchTableData";
import {GridSortItem} from "@mui/x-data-grid/models/gridSortModel";
import {ACTION_TYPE, ADMIN_ACTIONS, ENTITY_NAMES} from "@/app/lib/enums";

function createMovieData(description: string, title: string, length: number, ratings: number, watch: number): Movies {
    const id = 1000 + Math.random();
    return {id, title, description, length, ratings, watch, insertTimestamp: new Date(), updateTimestamp: new Date()};
}

const movieRows: Movies[] = [
    createMovieData('India', 'IN', 7, 5, 2),
    createMovieData('China', 'CN', 4, 4, 2),
    createMovieData('Italy', 'IT', 5, 4, 2),
    createMovieData('United States', 'US', 6, 4, 2),
    createMovieData('Canada', 'CA', 9, 3, 2),
    createMovieData('Australia', 'AU', 7, 5, 2),
    createMovieData('Germany', 'DE', 9, 5, 2),
    createMovieData('Ireland', 'IE', 8, 3, 2),
    createMovieData('Mexico', 'MX', 7, 3, 2),
    createMovieData('Japan', 'JP', 3, 4, 2),
    createMovieData('France', 'FR', 4, 5, 2),
    createMovieData('United Kingdom', 'GB', 5, 5, 2),
    createMovieData('Russia', 'RU', 6, 3, 2),
    createMovieData('Nigeria', 'NG', 8, 4, 2),
    createMovieData('Brazil', 'BR', 9, 5, 2),
];

function createWebSeriesData(description: string, title: string, episodes: number, ratings: number, watch: number): WebSeries {
    const id = 1000 + Math.random();
    return {id, title, description, episodes, ratings, watch, insertTimestamp: new Date(), updateTimestamp: new Date()};
}

const webSeriesRows: WebSeries[] = [
    createWebSeriesData('India', 'IN', 7, 5, 2),
    createWebSeriesData('China', 'CN', 4, 4, 2),
    createWebSeriesData('Italy', 'IT', 5, 4, 2),
    createWebSeriesData('United States', 'US', 6, 4, 2),
    createWebSeriesData('Canada', 'CA', 9, 3, 2),
    createWebSeriesData('Australia', 'AU', 7, 5, 2),
    createWebSeriesData('Germany', 'DE', 9, 5, 2),
    createWebSeriesData('Ireland', 'IE', 8, 3, 2),
    createWebSeriesData('Mexico', 'MX', 7, 3, 2),
    createWebSeriesData('Japan', 'JP', 3, 4, 2),
    createWebSeriesData('France', 'FR', 4, 5, 2),
    createWebSeriesData('United Kingdom', 'GB', 5, 5, 2),
    createWebSeriesData('Russia', 'RU', 6, 3, 2),
    createWebSeriesData('Nigeria', 'NG', 8, 4, 2),
    createWebSeriesData('Brazil', 'BR', 9, 5, 2),
];

function createAllData(description: string, title: string, episodes: number, length: number, ratings: number, watch: number, themeName: string, genreName: string): AllData {
    const id = 1000 + Math.random();
    const themeId = 1000 + Math.random();
    const genreId = 1000 + Math.random();
    return {
        id,
        themeId,
        genreId,
        title,
        description,
        episodes,
        ratings,
        watch,
        themeName,
        genreName,
        length,
        insertTimestamp: new Date(),
        updateTimestamp: new Date()
    };
}

const allDataRows: AllData[] = [
    createAllData('India', 'IN', 7, 5, 2, 5, "Test", "Genre"),
    createAllData('China', 'CN', 4, 4, 2, 5, "Test", "Genre"),
    createAllData('Italy', 'IT', 5, 4, 2, 5, "Test", "Genre"),
    createAllData('United States', 'US', 6, 4, 2, 5, "Test", "Genre"),
    createAllData('Canada', 'CA', 9, 3, 2, 5, "Test", "Genre"),
    createAllData('Australia', 'AU', 7, 5, 2, 5, "Test", "Genre"),
    createAllData('Germany', 'DE', 9, 5, 2, 5, "Test", "Genre"),
    createAllData('Ireland', 'IE', 8, 3, 2, 5, "Test", "Genre"),
    createAllData('Mexico', 'MX', 7, 3, 2, 5, "Test", "Genre"),
    createAllData('Japan', 'JP', 3, 4, 2, 5, "Test", "Genre"),
    createAllData('France', 'FR', 4, 5, 2, 5, "Test", "Genre"),
];

const initialRowData: AdminTableData = {
    movies: [],
    webSeries: [],
    genre: [],
    theme: [],
    all: []
};
const initialPaginationDetails: TablePaginationType = {
    page: 0,
    pageSize: 5,
    totalRows: 5,
    totalPages: 1
};
const initialSortingDetails: GridSortItem = {
    field: '',
    sort: null
};

const AdminTable = forwardRef<AdminTableLoadComponentType, AdminTableProps>((props, ref) => {
    const {index, currentIndex, handleEntityAction} = props;

    const webSeriesColumns: GridColDef[] = [
        {field: 'title', headerName: 'Title', minWidth: 200, sortable: true},
        {field: 'description', headerName: 'Description', minWidth: 250, sortable: true},
        {
            field: 'episodes',
            headerName: 'Total Episodes',
            type: "number",
            minWidth: 150,
            headerAlign: "left",
            align: "center",
            sortable: true,
        },
        {
            field: 'ratings',
            headerName: 'Ratings',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true,
            renderCell: (params) => {
                return <Rating name="read-only" value={params.row.ratings} precision={0.5} readOnly/>;
            }
        },
        {
            field: 'watch',
            headerName: 'Total Played',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true
        },
        {
            field: 'insertTimestamp',
            headerName: 'Created At',
            minWidth: 250,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.insertTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'updateTimestamp',
            headerName: 'Updated At',
            minWidth: 250,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.updateTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            align: 'center',
            headerAlign: "center",
            disableColumnMenu: true,
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                const onEditClick = (e: any) => {
                    e.stopPropagation();

                    console.log(e);
                    console.error("--------------------");
                    console.log(params);
                };

                const onDeleteClick = (e: any) => {
                    e.stopPropagation();

                    console.log(e);
                    console.error("--------------------");
                    console.log(params);
                };

                return (
                    <ButtonGroup variant="text" aria-label="Action Button Group">
                        <Button onClick={onEditClick}>
                            <Tooltip title="Edit">
                                <ModeEditIcon/>
                            </Tooltip>
                        </Button>
                        <Button onClick={onDeleteClick}>
                            <Tooltip title="Delete">
                                <DeleteIcon/>
                            </Tooltip>
                        </Button>
                    </ButtonGroup>)
            }
        },
    ];
    const moviesColumns: GridColDef[] = [
        {field: 'title', headerName: 'Title', minWidth: 200, sortable: true},
        {field: 'description', headerName: 'Description', minWidth: 250, sortable: true},
        {
            field: 'length',
            headerName: 'Total Length',
            type: "number",
            minWidth: 150,
            headerAlign: "left",
            align: "center",
            sortable: true,
            renderCell: (params) => {
                return <Typography>{params.row.length} mins</Typography>;
            }
        },
        {
            field: 'ratings',
            headerName: 'Ratings',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true,
            renderCell: (params) => {
                return <Rating name="read-only" value={params.row.ratings} precision={0.5} readOnly/>;
            }
        },
        {
            field: 'watch',
            headerName: 'Total Played',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true
        },
        {
            field: 'insertTimestamp',
            headerName: 'Created At',
            minWidth: 200,
            sortable: true,
            align: "center",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.insertTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'updateTimestamp',
            headerName: 'Updated At',
            minWidth: 200,
            sortable: true,
            align: "center",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.updateTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            align: 'center',
            headerAlign: "center",
            disableColumnMenu: true,
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                const onEditClick = (e: any) => {
                    e.stopPropagation();

                    console.log(e);
                    console.error("--------------------");
                    console.log(params);
                };

                const onDeleteClick = (e: any) => {
                    e.stopPropagation();

                    console.log(e);
                    console.error("--------------------");
                    console.log(params);
                };

                return (
                    <ButtonGroup variant="text" aria-label="Action Button Group">
                        <Button onClick={onEditClick}>
                            <Tooltip title="Edit">
                                <ModeEditIcon/>
                            </Tooltip>
                        </Button>
                        <Button onClick={onDeleteClick}>
                            <Tooltip title="Delete">
                                <DeleteIcon/>
                            </Tooltip>
                        </Button>
                    </ButtonGroup>)
            }
        },
    ];
    const genreColumns: GridColDef[] = [
        {field: 'genreName', headerName: 'Genre', minWidth: 200, sortable: true},
        {
            field: 'insertTimestamp',
            headerName: 'Created At',
            minWidth: 300,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.insertTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'updateTimestamp',
            headerName: 'Updated At',
            minWidth: 300,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.updateTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            align: 'center',
            headerAlign: "center",
            disableColumnMenu: true,
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                const onEditClick = (e: any) => {
                    e.stopPropagation();
                    console.log("Edit", params?.id);
                    handleEntityAction(ADMIN_ACTIONS.EDITGENRE, ENTITY_NAMES.GENRE, ACTION_TYPE.UPDATE, params?.id).then();
                };

                const onDeleteClick = (e: any) => {
                    e.stopPropagation();
                    console.log("Delete", params?.id);
                    handleEntityAction(ADMIN_ACTIONS.DELETEGENRE, ENTITY_NAMES.GENRE, ACTION_TYPE.DELETE, params?.id).then();
                };

                return (
                    <ButtonGroup variant="text" aria-label="Action Button Group">
                        <Button onClick={onEditClick}>
                            <Tooltip title="Edit">
                                <ModeEditIcon/>
                            </Tooltip>
                        </Button>
                        <Button onClick={onDeleteClick}>
                            <Tooltip title="Delete">
                                <DeleteIcon/>
                            </Tooltip>
                        </Button>
                    </ButtonGroup>)
            }
        },
    ];
    const themeColumns: GridColDef[] = [
        {field: 'themeName', headerName: 'Theme', minWidth: 200, sortable: true},
        {
            field: 'insertTimestamp',
            headerName: 'Created At',
            minWidth: 300,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.insertTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'updateTimestamp',
            headerName: 'Updated At',
            minWidth: 300,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.updateTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            align: 'center',
            headerAlign: "center",
            disableColumnMenu: true,
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                const onEditClick = (e: any) => {
                    e.stopPropagation();
                    console.log("Edit", params?.id);
                    handleEntityAction(ADMIN_ACTIONS.EDITTHEME, ENTITY_NAMES.THEME, ACTION_TYPE.UPDATE, params?.id).then();
                };

                const onDeleteClick = (e: any) => {
                    e.stopPropagation();
                    console.log("Delete", params?.id);
                    handleEntityAction(ADMIN_ACTIONS.DELETETHEME, ENTITY_NAMES.THEME, ACTION_TYPE.DELETE, params?.id).then();
                };

                return (
                    <ButtonGroup variant="text" aria-label="Action Button Group">
                        <Button onClick={onEditClick}>
                            <Tooltip title="Edit">
                                <ModeEditIcon/>
                            </Tooltip>
                        </Button>
                        <Button onClick={onDeleteClick}>
                            <Tooltip title="Delete">
                                <DeleteIcon/>
                            </Tooltip>
                        </Button>
                    </ButtonGroup>)
            }
        },
    ];
    const allDataColumns: GridColDef[] = [
        {field: 'title', headerName: 'Title', minWidth: 200, sortable: true},
        {field: 'description', headerName: 'Description', minWidth: 250, sortable: true},
        {field: 'genreName', headerName: 'Genre', minWidth: 200, sortable: true, flex: 1},
        {field: 'themeName', headerName: 'Theme', minWidth: 200, sortable: true, flex: 1},
        {
            field: 'length',
            headerName: 'Total Length',
            type: "number",
            minWidth: 150,
            headerAlign: "left",
            align: "center",
            sortable: true,
            renderCell: (params) => {
                return <Typography>{params.row.length} mins</Typography>;
            }
        },
        {
            field: 'episodes',
            headerName: 'Total Episodes',
            type: "number",
            minWidth: 150,
            headerAlign: "left",
            align: "center",
            sortable: true,
        },
        {
            field: 'ratings',
            headerName: 'Ratings',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true,
            renderCell: (params) => {
                return <Rating name="read-only" value={params.row.ratings} precision={0.5} readOnly/>;
            }
        },
        {
            field: 'watch',
            headerName: 'Total Played',
            minWidth: 150,
            type: "number",
            align: 'center',
            headerAlign: "left",
            sortable: true
        },
        {
            field: 'insertTimestamp',
            headerName: 'Created At',
            minWidth: 250,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.insertTimestamp).toLocaleString()}</Typography>
            }
        },
        {
            field: 'updateTimestamp',
            headerName: 'Updated At',
            minWidth: 250,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                return <Typography>{new Date(params.row.updateTimestamp).toLocaleString()}</Typography>
            }
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     align: 'center',
        //     headerAlign: "center",
        //     disableColumnMenu: true,
        //     flex: 1,
        //     minWidth: 200,
        //     sortable: false,
        //     renderCell: (params) => {
        //         const onEditClick = (e: any) => {
        //             e.stopPropagation();
        //
        //             console.log(e);
        //             console.error("--------------------");
        //             console.log(params);
        //         };
        //
        //         const onDeleteClick = (e: any) => {
        //             e.stopPropagation();
        //
        //             console.log(e);
        //             console.error("--------------------");
        //             console.log(params);
        //         };
        //
        //         return (
        //             <ButtonGroup variant="text" aria-label="Action Button Group">
        //                 <Button onClick={onEditClick}>
        //                     <Tooltip title="Edit">
        //                         <ModeEditIcon/>
        //                     </Tooltip>
        //                 </Button>
        //                 <Button onClick={onDeleteClick}>
        //                     <Tooltip title="Delete">
        //                         <DeleteIcon/>
        //                     </Tooltip>
        //                 </Button>
        //             </ButtonGroup>)
        //     }
        // },
    ];

    const [tableLoading, setTableLoading] = useState(false);
    const [rowData, setRowData] = useState<AdminTableData>(initialRowData);
    const [tablePaginationDetails, setTablePaginationDetails] = useState<TablePaginationType>(initialPaginationDetails);
    const [tableSortDetails, setTableSortDetails] = useState<GridSortItem>(initialSortingDetails);

    const adminTableRows = [rowData.movies, rowData.webSeries, rowData.genre, rowData.theme, rowData.all];
    const adminTableColumns = [moviesColumns, webSeriesColumns, genreColumns, themeColumns, allDataColumns];

    const extractAndValidateFieldName = (tableSortInfo: GridSortItem): ADMIN_TABLE_SORT_FIELD_TYPE | undefined => {
        if (tableSortInfo.field === "themeName" || "genreName" || tableSortInfo.field === "insertTimestamp" || tableSortInfo.field === "updateTimestamp") {
            return tableSortInfo.field as ADMIN_TABLE_SORT_FIELD_TYPE;
        } else {
            return undefined;
        }
    };

    const populateTable = useCallback(async (name: AdminTableTabName) => {
        try {
            setTableLoading(true);
            const pageNo = tablePaginationDetails.page;
            const pageSize = tablePaginationDetails.pageSize;
            const sortDirection = tableSortDetails?.sort;
            const fieldName = extractAndValidateFieldName(tableSortDetails) || "updateTimestamp";
            let apiCall: Promise<ThemeAdminTableDataApiResponse | GenreAdminTableDataApiResponse | MoviesAdminTableDataApiResponse | WebSeriesAdminTableDataApiResponse | AllDataAdminTableDataApiResponse>;
            if (name === "theme") {
                apiCall = fetchAdminTableData(name, pageNo, pageSize, fieldName, sortDirection);
            } else if (name === "genre") {
                apiCall = fetchAdminTableData(name, pageNo, pageSize, fieldName, sortDirection);
            } else if (name === "movies") {
                apiCall = fetchAdminTableData(name, pageNo, pageSize, fieldName, sortDirection);
                // setRowData(prevState => ({...prevState, [name]: movieRows}));
            } else if (name === "webSeries") {
                apiCall = fetchAdminTableData(name, pageNo, pageSize, fieldName, sortDirection);
                // setRowData(prevState => ({...prevState, [name]: webSeriesRows}));
            } else {
                apiCall = fetchAdminTableData(name, pageNo, pageSize, fieldName, sortDirection);
                // setRowData(prevState => ({...prevState, [name]: allDataRows}))
            }
            const data = await apiCall;
            setTablePaginationDetails(prevState => ({
                ...prevState,
                totalRows: data?.totalElements,
                totalPages: data?.totalPages
            }));
            setRowData(prevState => ({...prevState, [name]: data.content}));
        } catch (error: any) {
            console.error(error);
        } finally {
            setTableLoading(false);
        }
    }, [tablePaginationDetails.page, tablePaginationDetails.pageSize, tableSortDetails?.field, tableSortDetails?.sort]);

    const loadTableData = async () => {
        if (index === currentIndex) {
            switch (currentIndex) {
                case 0:
                    await populateTable("movies");
                    break;
                case 1:
                    await populateTable("webSeries");
                    break;
                case 2:
                    await populateTable("genre");
                    break;
                case 3:
                    await populateTable("theme");
                    break;
                case 4:
                    await populateTable("all");
                    break;
            }
        }
    };

    const setPaginationToInitial = () => {
        setTablePaginationDetails(prevState => ({
            ...prevState,
            page: 0
        }));
    };

    const handlePaginationChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
        console.log("pagination ---------------------------");
        console.log(model);
        console.log(details);
        setTablePaginationDetails(prevState => ({...prevState, ...model}));
        // loadTableData();
    };
    const handleSortingChange = (model: GridSortModel, details: GridCallbackDetails) => {
        console.log("sorting ---------------------------");
        console.log(model);
        console.log(details);
        if (model.length) {
            setTableSortDetails(model[0]);
        } else {
            setTableSortDetails(initialSortingDetails);
        }
        // loadTableData();
    };

    const LoadingSkeleton = () => (
        <Box
            sx={{
                height: "max-content"
            }}
        >
            {[...Array(5)].map((_, idx) => {
                    return (
                        <div key={idx} className="flex flex-nowrap">
                            {adminTableColumns[currentIndex].map((column, index) => (
                                <Skeleton variant="rectangular" key={index} height={50} width={column.minWidth}
                                          style={{margin: "1px 0.5px", flexShrink: 0}}/>
                            ))}
                        </div>
                    )
                }
            )}
        </Box>
    );
    const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
        return {
            top: params.isFirstVisible ? 0 : '5px',
            bottom: params.isLastVisible ? 0 : '5px',
        };
    }, []);

    useEffect(() => {
        console.log("In Use Effect Admin table");
        loadTableData().then();
    }, [tablePaginationDetails.page, tablePaginationDetails.pageSize, tableSortDetails.sort, tableSortDetails.field]);

    useImperativeHandle(ref, () => {
        return {
            loadTableData,
            setPaginationToInitial
        };
    });

    return (
        <div>
            <DataGrid
                sx={{
                    // minHeight: tableLoading ? 300 : adminTableRows[currentIndex]?.length * 52,
                    "& .MuiDataGrid-virtualScroller": {
                        minHeight: 200
                    }
                }}
                rows={adminTableRows[currentIndex]}
                columns={adminTableColumns[currentIndex]}
                // getRowSpacing={getRowSpacing}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                slots={{
                    noRowsOverlay: NoRowOverlay,
                    // loadingOverlay: LoadingSkeleton,
                    toolbar: GridToolbar
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true
                    }
                }}
                // filterMode="server"
                loading={tableLoading}
                // checkboxSelection
                // disableRowSelectionOnClick
                disableDensitySelector
                disableColumnSelector
                // autoHeight
                // autoPageSize
                // showColumnVerticalBorder
                // showCellVerticalBorder
                rowCount={tablePaginationDetails.totalRows}
                paginationMode="server"
                paginationModel={tablePaginationDetails}
                onPaginationModelChange={handlePaginationChange}
                sortingMode="server"
                sortModel={[tableSortDetails]}
                onSortModelChange={handleSortingChange}
            />
        </div>
    );
});

export default AdminTable;
