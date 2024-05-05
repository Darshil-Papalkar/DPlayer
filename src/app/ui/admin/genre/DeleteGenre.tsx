import TextField from "@mui/material/TextField";
import React from "react";
import {AdminDialogData, Theme} from "@/app/lib/definitions";

const DeleteGenre = ({dialogData}: { dialogData: AdminDialogData }) => {

    return (
        <>
            <TextField
                autoFocus
                id="genreName"
                name="genreName"
                label="Delete Genre"
                type="text"
                value={"genreName" in dialogData.genre ? dialogData.genre.genreName : ""}
                helperText="Genre Name to be Deleted"
                required
                fullWidth
                disabled={true}
            />
        </>
    );
};

export default DeleteGenre;