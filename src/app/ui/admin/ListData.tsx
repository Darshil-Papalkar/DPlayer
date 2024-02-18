"use client";

import * as React from "react";
import {GridColDef} from "@mui/x-data-grid";
import {Box, Button, ButtonGroup, Paper, Rating, Tab, Tabs, Typography} from "@mui/material";
import CustomTable from "@/app/ui/admin/CustomTable";
import {AdminTableData, DialogState, SpeedDialItemsType, TabPanelProps} from "@/app/lib/definitions";
import CustomSpeedDial from "@/app/ui/admin/CustomSpeedDial";
import AddMovieDetails from "@/app/ui/admin/movies/AddMovieDetails";
import EditMovieDetails from "@/app/ui/admin/movies/EditMovieDetails";
import AddWebSeriesDetails from "@/app/ui/admin/webseries/AddWebSeriesDetails";
import EditWebSeriesDetails from "@/app/ui/admin/webseries/EditWebSeriesDetails";
import AddEditDialog from "@/app/ui/admin/AddEditDialog";
import AddCategory from "@/app/ui/admin/category/AddCategory";
import AddGenre from "@/app/ui/admin/genre/AddGenre";
import EditCategory from "@/app/ui/admin/category/EditCategory";
import EditGenre from "@/app/ui/admin/genre/EditGenre";

const columns: GridColDef[] = [
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
        field: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        align: 'center',
        headerAlign: "center",
        disableColumnMenu: true,
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
                    <Button onClick={onEditClick}>Edit</Button>
                    <Button onClick={onDeleteClick}>Delete</Button>
                </ButtonGroup>)
        }
    },
];

function createData(description: string, title: string, episodes: number, ratings: number, watch: number): AdminTableData {
    const id = 1000 + Math.random();
    return {id, title, description, episodes, ratings, watch};
}

const rows: AdminTableData[] = [
    createData('India', 'IN', 7, 5, 2),
    createData('China', 'CN', 4, 4, 2),
    createData('Italy', 'IT', 5, 4, 2),
    createData('United States', 'US', 6, 4, 2),
    createData('Canada', 'CA', 9, 3, 2),
    createData('Australia', 'AU', 7, 5, 2),
    createData('Germany', 'DE', 9, 5, 2),
    createData('Ireland', 'IE', 8, 3, 2),
    createData('Mexico', 'MX', 7, 3, 2),
    createData('Japan', 'JP', 3, 4, 2),
    createData('France', 'FR', 4, 5, 2),
    createData('United Kingdom', 'GB', 5, 5, 2),
    createData('Russia', 'RU', 6, 3, 2),
    createData('Nigeria', 'NG', 8, 4, 2),
    createData('Brazil', 'BR', 9, 5, 2),
];

const CustomTabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ListData = () => {
    const [tableLoading, setTableLoading] = React.useState(false);
    const [rowData, setRowData] = React.useState<AdminTableData[]>([]);
    const [value, setValue] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [speedDialItem, setSpeedDialItem] = React.useState<SpeedDialItemsType>(null);
    const [speedDialComponent, setSpeedDialComponent] = React.useState<DialogState | null>(null);
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setRowData([]);
        loadData().then(r => {
        });
    };
    const loadData = async () => {
        try {
            setTableLoading(true);
            setTimeout(() => {
                setRowData(rows);
                setTableLoading(false);
            }, 2000);
        } catch (error: any) {
            console.error(error);
        }
    }

    const updateSetSpeedDialItem = (item: SpeedDialItemsType) => {
        setSpeedDialItem(item);
        handleDialogClickOpen();
    };


    React.useEffect(() => {
        loadData().then(r => {
        });
    }, []);

    React.useEffect(() => {
        switch (speedDialItem) {
            case "addmovies":
                setSpeedDialComponent({
                    element: <AddMovieDetails/>,
                    title: "Add Movie Details",
                });
                break;
            case "editmovies":
                setSpeedDialComponent({
                    element: <EditMovieDetails/>,
                    title: "Edit Movie Details",
                });
                break;
            case "addwebseries":
                setSpeedDialComponent({
                    element: <AddWebSeriesDetails/>,
                    title: "Add Web Series Details",
                });
                break;
            case "editwebseries":
                setSpeedDialComponent({
                    element: <EditWebSeriesDetails/>,
                    title: "Edit Web Series Details",
                });
                break;
            case "addcategory":
                setSpeedDialComponent({
                    element: <AddCategory/>,
                    title: "Add Category Details",
                });
                break;
            case "editcateogry":
                setSpeedDialComponent({
                    element: <EditCategory/>,
                    title: "Edit Category Details",
                });
                break;
            case "addgenre":
                setSpeedDialComponent({
                    element: <AddGenre/>,
                    title: "Add Genre Details",
                });
                break;
            case "editgenre":
                setSpeedDialComponent({
                    element: <EditGenre/>,
                    title: "Edit Genre Details",
                });
                break;
            default:
                setSpeedDialComponent({
                    element: <div></div>,
                    title: ""
                });
                break;
        }
    }, [speedDialItem]);

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', marginTop: "2rem", minHeight: 300}}>
            <AddEditDialog open={dialogOpen} handleClose={handleDialogClose} dialogComponent={speedDialComponent}/>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="Admin Table Tabs" centered={true}>
                    <Tab label="Movies" {...a11yProps(0)} />
                    <Tab label="Web Series" {...a11yProps(1)} />
                    <Tab label="All" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CustomTable rows={rowData} columns={columns} isLoading={tableLoading}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CustomTable rows={rowData} columns={columns} isLoading={tableLoading}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <CustomTable rows={rowData} columns={columns} isLoading={tableLoading}/>
            </CustomTabPanel>
            <CustomSpeedDial selectSpeedDialItem={updateSetSpeedDialItem}/>
        </Paper>
    );
};

export default ListData;
