export enum USER_ACTIONS {
    LOGIN = "login",
    REGISTER = "register",
}

export enum FORM_ACTIONS {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}

export enum ACTION_TYPE {
    CREATE,
    UPDATE,
    DELETE
}

export enum ENTITY_NAMES {
    MOVIES,
    WEBSERIES,
    THEME,
    GENRE
}
export enum ADMIN_ACTIONS {
    ADDMOVIES = "addmovies",
    EDITMOVIES = "editmovies",
    ADDWEBSERIES = "addwebseries",
    EDITWEBSERIES = "editwebseries",
    ADDTHEME = "addtheme",
    EDITTHEME = "edittheme",
    DELETETHEME = "deletetheme",
    ADDGENRE = "addgenre",
    EDITGENRE = "editgenre",
    DELETEGENRE = "deletegenre"
}

export enum ADMIN_TABLE_SORT_FIELD {
    themeName = "THEME_NAME",
    genreName = "GENRE_NAME",
    insertTimestamp = "INSERT_TIME_STAMP",
    updateTimestamp = "UPDATE_TIME_STAMP"
}