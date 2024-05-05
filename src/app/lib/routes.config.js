const BASE_URI = process.env.SERVER_URL;
const PUBLIC_BASE_URI = process.env.NEXT_PUBLIC_SERVER_URL;

export const LOGIN_USER = BASE_URI + "/user/login";
export const REGISTER_USER = BASE_URI + "/user/create";

// GENRE
export const ADD_GENRE = PUBLIC_BASE_URI + "/admin/addGenre";
export const EDIT_GENRE = PUBLIC_BASE_URI + "/admin/editGenre/";
export const GET_GENRE_BY_ID = PUBLIC_BASE_URI + "/admin/getGenre/";
export const GET_ALL_GENRE = PUBLIC_BASE_URI + "/admin/getAllGenres";
export const DELETE_GENRE_BY_ID = PUBLIC_BASE_URI + "/admin/deleteGenre/";

// THEME
export const ADD_THEME = PUBLIC_BASE_URI + "/admin/addTheme";
export const EDIT_THEME = PUBLIC_BASE_URI + "/admin/editTheme/";
export const GET_THEME_BY_ID = PUBLIC_BASE_URI + "/admin/getTheme/";
export const GET_ALL_THEME = PUBLIC_BASE_URI + "/admin/getAllThemes";
export const DELETE_THEME_BY_ID = PUBLIC_BASE_URI + "/admin/deleteTheme/";
