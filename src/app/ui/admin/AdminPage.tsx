"use client";

import * as React from "react";
import {Box, Paper, Tab, Tabs} from "@mui/material";
import AdminTable from "@/app/ui/admin/AdminTable";
import {
    AdminDialogData,
    AdminTableLoadComponentType,
    API_METHODS,
    DialogState,
    SpeedDialFormJsonData,
    SpeedDialItemsType
} from "@/app/lib/definitions";
import AdminSpeedDial from "@/app/ui/admin/AdminSpeedDial";
import AddMovieDetails from "@/app/ui/admin/movies/AddMovieDetails";
import EditMovieDetails from "@/app/ui/admin/movies/EditMovieDetails";
import AddWebSeriesDetails from "@/app/ui/admin/webseries/AddWebSeriesDetails";
import EditWebSeriesDetails from "@/app/ui/admin/webseries/EditWebSeriesDetails";
import AddEditDialog from "@/app/ui/admin/AddEditDialog";
import AddTheme from "@/app/ui/admin/theme/AddTheme";
import AddGenre from "@/app/ui/admin/genre/AddGenre";
import EditTheme from "@/app/ui/admin/theme/EditTheme";
import EditGenre from "@/app/ui/admin/genre/EditGenre";
import {
    ADD_GENRE,
    ADD_THEME,
    DELETE_GENRE_BY_ID,
    DELETE_THEME_BY_ID,
    EDIT_GENRE,
    EDIT_THEME
} from "@/app/lib/routes.config";
import NestedLoading from "@/app/ui/loader/NestedLoading";
import {ACTION_TYPE, ADMIN_ACTIONS, ENTITY_NAMES} from "@/app/lib/enums";
import {getGenreData, getThemeData} from "@/app/ui/admin/fetchTableData";
import toast from "react-hot-toast";
import {GridRowId} from "@mui/x-data-grid";
import DeleteTheme from "@/app/ui/admin/theme/DeleteTheme";
import {
    ADD_GENRE_TITLE,
    ADD_MOVIE_TITLE,
    ADD_THEME_TITLE,
    ADD_WEB_SERIES_TITLE, DELETE_GENRE_TITLE,
    DELETE_THEME_TITLE,
    EDIT_GENRE_TITLE,
    EDIT_MOVIE_TITLE,
    EDIT_THEME_TITLE,
    EDIT_WEB_SERIES_TITLE,
    GENRE_DESCRIPTION,
    MOVIE_DESCRIPTION,
    THEME_DESCRIPTION,
    WEB_SERIES_DESCRIPTION
} from "@/app/ui/admin/constants";
import DeleteGenre from "@/app/ui/admin/genre/DeleteGenre";

const adminTabProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const initialDialogData = {
    theme: {},
    genre: {},
    movie: {},
    webSeries: {},
    allData: {}

};

const AdminPage = () => {
    const adminTableRef = React.useRef<AdminTableLoadComponentType>(null);

    const [value, setValue] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [speedDialOpen, setSpeedDialOpen] = React.useState<boolean>(false);
    const [speedDialItem, setSpeedDialItem] = React.useState<ADMIN_ACTIONS>();
    const [speedDialComponent, setSpeedDialComponent] = React.useState<DialogState | null>(null);
    const [dialogData, setDialogData] = React.useState<AdminDialogData>(initialDialogData);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);
    const handleDialogClickOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        console.log("Resetting Dialog Data");
        setDialogData(initialDialogData);
        console.log("Closing Dialog");
        setDialogOpen(false);
        console.log("Closing Speed Dial");
        handleSpeedDialClose();
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const updateSelectedSpeedDialItem = (item: ADMIN_ACTIONS) => {
        setSpeedDialItem(item);
        handleDialogClickOpen();
    };

    const handleRowAction = async (item: ADMIN_ACTIONS, entityName: ENTITY_NAMES, actionType: ACTION_TYPE, itemId: GridRowId) => {
        if (entityName === ENTITY_NAMES.MOVIES) {

        } else if (entityName === ENTITY_NAMES.WEBSERIES) {

        } else if (entityName === ENTITY_NAMES.GENRE) {
            const genre = await getGenreData(itemId);
            setDialogData(prev => ({
                ...prev,
                genre: genre
            }));
        } else if (entityName === ENTITY_NAMES.THEME) {
            const theme = await getThemeData(itemId);
            setDialogData(prev => ({
                ...prev,
                theme: theme
            }));
        }
        // if (actionType === ACTION_TYPE.UPDATE) {
        //     if (entityName === ENTITY_NAMES.MOVIES) {
        //
        //     } else if (entityName === ENTITY_NAMES.WEBSERIES) {
        //
        //     } else if (entityName === ENTITY_NAMES.GENRE) {
        //
        //     } else if (entityName === ENTITY_NAMES.THEME) {
        //         const theme = await getThemeData(itemId);
        //         setDialogData(prev => ({
        //             ...prev,
        //             theme: theme
        //         }));
        //     }
        // }
        // else if (actionType === ACTION_TYPE.DELETE) {
        //     if (entityName === ENTITY_NAMES.MOVIES) {
        //
        //     } else if (entityName === ENTITY_NAMES.WEBSERIES) {
        //
        //     } else if (entityName === ENTITY_NAMES.GENRE) {
        //
        //     } else if (entityName === ENTITY_NAMES.THEME) {
        //         // await deleteThemeData(itemId);
        //         const theme = await getThemeData(itemId);
        //         setDialogData(prevState => ({
        //             ...prevState,
        //             theme: them
        //         }));
        //     }
        // }
        updateSelectedSpeedDialItem(item);
    };

    React.useEffect(() => {
        switch (speedDialItem) {
            case "addmovies":
                setSpeedDialComponent({
                    element: <AddMovieDetails/>,
                    title: ADD_MOVIE_TITLE,
                    description: MOVIE_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "editmovies":
                setSpeedDialComponent({
                    element: <EditMovieDetails/>,
                    title: EDIT_MOVIE_TITLE,
                    description: MOVIE_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "addwebseries":
                setSpeedDialComponent({
                    element: <AddWebSeriesDetails/>,
                    title: ADD_WEB_SERIES_TITLE,
                    description: WEB_SERIES_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "editwebseries":
                setSpeedDialComponent({
                    element: <EditWebSeriesDetails/>,
                    title: EDIT_WEB_SERIES_TITLE,
                    description: WEB_SERIES_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "addtheme":
                setSpeedDialComponent({
                    element: <AddTheme/>,
                    title: ADD_THEME_TITLE,
                    description: THEME_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "edittheme":
                setSpeedDialComponent({
                    element: <EditTheme dialogData={dialogData}/>,
                    title: EDIT_THEME_TITLE,
                    description: THEME_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "deletetheme":
                setSpeedDialComponent({
                    element: <DeleteTheme dialogData={dialogData}/>,
                    title: DELETE_THEME_TITLE,
                    description: THEME_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "addgenre":
                setSpeedDialComponent({
                    element: <AddGenre/>,
                    title: ADD_GENRE_TITLE,
                    description: GENRE_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "editgenre":
                setSpeedDialComponent({
                    element: <EditGenre dialogData={dialogData}/>,
                    title: EDIT_GENRE_TITLE,
                    description: GENRE_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            case "deletegenre":
                setSpeedDialComponent({
                    element: <DeleteGenre dialogData={dialogData}/>,
                    title: DELETE_GENRE_TITLE,
                    description: THEME_DESCRIPTION,
                    item: speedDialItem
                });
                break;
            default:
                setSpeedDialComponent({
                    element: <div></div>,
                    title: "",
                    description: "",
                    item: null
                });
                break;
        }
    }, [speedDialItem, dialogData]);

    const handleFormSubmit = async (item: SpeedDialItemsType, formData: SpeedDialFormJsonData, entityId: string) => {
        setLoading(true);
        let url = "";
        console.log("Form Submit", entityId);
        let method: API_METHODS = "POST";
        switch (item) {
            case 'addgenre':
                url = ADD_GENRE;
                break;
            case 'editgenre':
                url = EDIT_GENRE + entityId;
                method = "PUT"
                break;
            case 'deletegenre':
                url = DELETE_GENRE_BY_ID + entityId;
                method = "DELETE";
                break;
            case 'addtheme':
                url = ADD_THEME;
                break;
            case 'edittheme':
                url = EDIT_THEME + entityId;
                method = "PUT";
                break;
            case 'deletetheme':
                url = DELETE_THEME_BY_ID + entityId;
                method = "DELETE";
                break;
            default:
                console.error("Error as no case matched");
                return;
        }
        const body = JSON.stringify(formData);
        console.log(formData, url, method, body);
        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                console.error(response);
                toast.error(data.message);
                return;
            }
            console.log(data);
            toast.success(data.message);
        } catch (error: any) {
            console.error(error);
            toast.error(JSON.stringify(error));
        } finally {
            setLoading(false);
        }
        if(method === "PUT") {
            adminTableRef.current?.setPaginationToInitial();
        }
        adminTableRef.current?.loadTableData();
        handleDialogClose();
    };

    return (
        <>
            <NestedLoading loading={loading}/>
            <Paper sx={{width: '100%', overflow: 'hidden', marginY: "2rem", minHeight: 300}}>
                <AddEditDialog open={dialogOpen} handleClose={handleDialogClose} handleSubmit={handleFormSubmit}
                               dialogComponent={speedDialComponent} dialogData={dialogData}/>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="Admin Table Tabs" centered={true}>
                        <Tab label="Movies" {...adminTabProps(0)} />
                        <Tab label="Web Series" {...adminTabProps(1)} />
                        <Tab label="Genre" {...adminTabProps(2)} />
                        <Tab label="Theme" {...adminTabProps(3)} />
                        <Tab label="All" {...adminTabProps(4)} />
                    </Tabs>
                </Box>
                {
                    [...Array(5)].map((_, index) => {
                        return (
                            <div
                                role="tabpanel"
                                hidden={value !== index}
                                id={`simple-tabpanel-${index}`}
                                key={index + 100}
                            >
                                {value === index && (
                                    <Box sx={{p: 3}}>
                                        <AdminTable index={index} currentIndex={value}
                                                    handleEntityAction={handleRowAction}
                                                    ref={adminTableRef}/>
                                    </Box>
                                )}
                            </div>
                        );
                    })
                }
                <AdminSpeedDial isOpen={speedDialOpen} handleOpen={handleSpeedDialOpen}
                                handleClose={handleSpeedDialClose} selectSpeedDialItem={updateSelectedSpeedDialItem}/>
            </Paper>
        </>
    );
};

export default AdminPage;
