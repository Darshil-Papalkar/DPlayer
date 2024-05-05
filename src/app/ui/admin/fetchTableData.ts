import {
    ADMIN_TABLE_SORT_FIELD_TYPE,
    AdminCombineTableDataApiResponse,
    AdminTableTabName,
    AllDataAdminTableDataApiResponse, Genre,
    GenreAdminTableDataApiResponse,
    MoviesAdminTableDataApiResponse,
    Theme,
    ThemeAdminTableDataApiResponse,
    WebSeriesAdminTableDataApiResponse
} from "@/app/lib/definitions";
import {
    DELETE_THEME_BY_ID,
    GET_ALL_GENRE,
    GET_ALL_THEME,
    GET_GENRE_BY_ID,
    GET_THEME_BY_ID
} from "@/app/lib/routes.config";
import {GridRowId, GridSortDirection} from "@mui/x-data-grid";
import {ADMIN_TABLE_SORT_FIELD} from "@/app/lib/enums";
import toast from "react-hot-toast";

const getTableApiUrl = (name: AdminTableTabName): string => {
    let api = "";
    switch (name) {
        case "movies":
            break;
        case "genre":
            api = GET_ALL_GENRE;
            break;
        case "theme":
            api = GET_ALL_THEME;
            break;
        case "webSeries":
            break;
        case "all":
            break;
    }
    return api;
};

export const fetchAdminTableData = async (name: AdminTableTabName, pageNo: number, pageSize: number, fieldName: ADMIN_TABLE_SORT_FIELD_TYPE, sortingDirection: GridSortDirection):
    Promise<ThemeAdminTableDataApiResponse | GenreAdminTableDataApiResponse> => {
    let api = getTableApiUrl(name);
    api += "?";
    const sortFieldName = ADMIN_TABLE_SORT_FIELD[fieldName];
    console.log(sortFieldName);
    console.log("fieldName", fieldName);
    if (pageNo !== null && pageNo !== undefined) api += `page=${pageNo}&`;
    if (pageSize !== null && pageSize !== undefined) api += `size=${pageSize}&`;
    if (sortingDirection) api += `sortDirection=${String(sortingDirection).toUpperCase()}&`;
    if (sortFieldName !== null && sortFieldName !== undefined) api += `sortField=${sortFieldName}`;
    console.log(api);
    try {
        const response = await fetch(api, {
            method: 'GET'
        });
        // console.log(data);
        if(name === "theme") {
            return await response.json() as ThemeAdminTableDataApiResponse;
        } else if(name === "genre") {
            return await response.json() as GenreAdminTableDataApiResponse;
        }

    } catch (error) {
        console.log(`Error Occurred while fetching data for ${name}`);
        console.error(error);
    }
    return {
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0,
        content: [],
        numberOfElements: 0
    };
};

export const getThemeData = async (id: GridRowId): Promise<Theme | {}> => {
    try {
        const response = await fetch(GET_THEME_BY_ID + `${id}`, {
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        console.log("Error when fetching theme", error);
        toast.error(`Error Occurred while fetching theme with id: ${id}`);
        return {};
    }
};

export const deleteThemeData = async (id: GridRowId): Promise<void> => {
    try {
        const response = await fetch(DELETE_THEME_BY_ID + `${id}`, {
            method: "DELETE"
        });
        const message = await response.json();
        console.log(message);
    } catch (error) {
        console.log(`Error Occurred while fetching theme with id: ${id}`);
    }
};

// export const fetchGenreTableData = async (name: AdminTableTabName, pageNo: number, pageSize: number, fieldName: ADMIN_TABLE_SORT_FIELD_TYPE, sortingDirection: GridSortDirection): Promise<ThemeAdminTableDataApiResponse> => {
//     let api = getTableApiUrl(name);
//     api += "?";
//     const sortFieldName = ADMIN_TABLE_SORT_FIELD[fieldName];
//     console.log(sortFieldName);
//     console.log("fieldName", fieldName);
//     if (pageNo !== null && pageNo !== undefined) api += `page=${pageNo}&`;
//     if (pageSize !== null && pageSize !== undefined) api += `size=${pageSize}&`;
//     if (sortingDirection) api += `sortDirection=${String(sortingDirection).toUpperCase()}&`;
//     if (sortFieldName !== null && sortFieldName !== undefined) api += `sortField=${sortFieldName}`;
//     console.log(api);
//     try {
//         const response = await fetch(api, {
//             method: 'GET'
//         });
//         // console.log(data);
//         if(name === "theme") {
//             return await response.json() as ThemeAdminTableDataApiResponse;
//         }
//
//     } catch (error) {
//         console.log(`Error Occurred while fetching data for ${name}`);
//         console.error(error);
//     }
//     return {
//         totalPages: 0,
//         totalElements: 0,
//         number: 0,
//         size: 0,
//         content: [],
//         numberOfElements: 0
//     };
// };

export const getGenreData = async (id: GridRowId): Promise<Genre | {}> => {
    try {
        const response = await fetch(GET_GENRE_BY_ID + `${id}`, {
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        console.log("Error when fetching genre", error);
        toast.error(`Error Occurred while fetching genre with id: ${id}`);
        return {};
    }
};