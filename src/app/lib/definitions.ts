import {store} from "@/app/redux/store";
import {GridPaginationModel, GridRenderCellParams, GridRowId} from "@mui/x-data-grid";
import * as React from "react";
import {ACTION_TYPE, ADMIN_ACTIONS, ENTITY_NAMES} from "@/app/lib/enums";

export type FormState = "login" | "register";
export type API_METHODS = "POST" | "PUT" | "DELETE";

export type RegisterFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
    success?: {
        message?: string;
        id?: string;
    };
};

export type LoginFormState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
    success?: {
        message?: string;
        id?: string;
    };
};

export interface FormBody {
    name?: string;
    email: string;
    password: string
}

export interface IAuthState {
    authState: boolean;
    authId: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface WebSeries {
    id: string;
    title: string;
    description: string;
    episodes: number;
    ratings: number;
    watch: number;
    insertTimestamp: Date;
    updateTimestamp: Date;
}

export interface Movies {
    id: string;
    title: string;
    description: string;
    length: number;
    ratings: number;
    watch: number;
    insertTimestamp: Date;
    updateTimestamp: Date;
}

export interface Genre {
    id: string;
    genreName: string;
    insertTimestamp: Date;
    updateTimestamp: Date;
}

export interface Theme {
    id: string;
    themeName: string;
    insertTimestamp: Date;
    updateTimestamp: Date;
}

export interface AllData {
    id: string;
    title: string;
    description: string;
    length: number;
    episodes: number;
    ratings: number;
    watch: number;
    themeId: string;
    themeName: string;
    genreId: string;
    genreName: string;
    insertTimestamp: Date;
    updateTimestamp: Date;
}

interface AdminTableDataApiResponse {
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface MoviesAdminTableDataApiResponse extends AdminTableDataApiResponse {
    content: Movies[];
}

export interface WebSeriesAdminTableDataApiResponse extends AdminTableDataApiResponse {
    content: WebSeries[];
}

export interface ThemeAdminTableDataApiResponse extends AdminTableDataApiResponse {
    content: Theme[];
}

export interface GenreAdminTableDataApiResponse extends AdminTableDataApiResponse {
    content: Genre[];
}

export interface AllDataAdminTableDataApiResponse extends AdminTableDataApiResponse {
    content: AllData[];
}

export type AdminCombineTableDataApiResponse =
    MoviesAdminTableDataApiResponse
    | WebSeriesAdminTableDataApiResponse
    | ThemeAdminTableDataApiResponse
    | GenreAdminTableDataApiResponse
    | AllDataAdminTableDataApiResponse;
export type AdminTableTabName = 'movies' | 'webSeries' | 'genre' | 'theme' | 'all';
export type AdminTableRowTypes = Movies[] | WebSeries[] | Genre[] | Theme[] | AllData[];

// export type AdminDialogData = Movies | WebSeries | Genre | Theme | AllData;

export interface AdminDialogData {
    theme: Theme | {};
    genre: Genre | {};
    movie: Movies | {};
    webSeries: WebSeries | {};
    allData: AllData | {};
}

export interface AdminTableData {
    movies: Movies[];
    webSeries: WebSeries[];
    genre: Genre[];
    theme: Theme[];
    all: AllData[];
}

export interface AdminTableProps {
    index: number;
    currentIndex: number;
    handleEntityAction: (item: ADMIN_ACTIONS, entityName: ENTITY_NAMES, actionType: ACTION_TYPE, itemId: GridRowId) => Promise<void>;
}

export type SpeedDialItemsType =
    'addmovies'
    | 'editmovies'
    | 'addwebseries'
    | 'editwebseries'
    | 'addtheme'
    | 'edittheme'
    | 'deletetheme'
    | 'addgenre'
    | 'editgenre'
    | 'deletegenre'
    | 'addall'
    | 'editall'
    | 'deleteall'
    | null;

export interface SpeedDialUpdateType {
    selectSpeedDialItem: (item: ADMIN_ACTIONS) => void;
    handleClose: () => void;
    handleOpen: () => void;
    isOpen: boolean
}

export interface DialogState {
    element: React.JSX.Element;
    title: string;
    description: string;
    item: SpeedDialItemsType;
}

export interface DialogEvent {
    entityName: ENTITY_NAMES;
    actionType: ACTION_TYPE;
    entityId: string;
    newValue?: string;
}

export type SpeedDialFormJsonData = { [p: string]: any };

export interface AddEditDialogPropsType {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (item: SpeedDialItemsType, formData: SpeedDialFormJsonData, entityId: string) => Promise<void>;
    dialogComponent: DialogState | null;
    dialogData: AdminDialogData;
}

export interface TablePaginationType extends GridPaginationModel {
    totalRows: number;
    totalPages: number;
}

export type ADMIN_TABLE_SORT_FIELD_TYPE = "themeName" | "genreName" | "insertTimestamp" | "updateTimestamp";

export interface AdminTableLoadComponentType {
    loadTableData: () => Promise<void>;
    setPaginationToInitial: () => void;
}

export interface GridTableParams extends GridRenderCellParams {
    id: string;
}