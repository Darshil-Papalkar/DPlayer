import {store} from "@/app/redux/store";
import {GridColDef} from "@mui/x-data-grid";
import * as React from "react";

export type FormState = "login" | "register";

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

export interface AdminTableData {
    id: number;
    title: string;
    description: string;
    episodes: number;
    ratings: number;
    watch: number;
}

export interface CustomTableProps {
    rows: AdminTableData[];
    columns: GridColDef[];
    isLoading: boolean;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type SpeedDialItemsType =
    'addmovies'
    | 'editmovies'
    | 'addwebseries'
    | 'editwebseries'
    | 'addcategory'
    | 'addgenre'
    | 'editcateogry'
    | 'editgenre'
    | null;

export interface SpeedDialUpdateType {
    selectSpeedDialItem: (item: SpeedDialItemsType) => void;
}

export interface DialogState {
    element: React.JSX.Element;
    title: string;
}

export interface AddEditDialogPropsType {
    open: boolean;
    handleClose: () => void;
    dialogComponent: DialogState | null;
}
