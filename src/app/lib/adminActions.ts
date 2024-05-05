import {GET_ALL_THEME} from "@/app/lib/routes.config";

export const FetchThemes = async () => {
    const response = await fetch(GET_ALL_THEME, {
        method: 'GET',

    })
};