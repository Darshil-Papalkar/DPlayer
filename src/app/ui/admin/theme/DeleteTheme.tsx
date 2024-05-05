import TextField from "@mui/material/TextField";
import React from "react";
import {AdminDialogData, Theme} from "@/app/lib/definitions";

const DeleteTheme = ({dialogData}: { dialogData: AdminDialogData }) => {

    return (
        <>
            <TextField
                autoFocus
                id="themeName"
                name="themeName"
                label="Delete Theme"
                type="text"
                value={"themeName" in dialogData.theme ? dialogData.theme.themeName : ""}
                helperText="Theme Name to be Deleted"
                required
                fullWidth
                disabled={true}
            />
        </>
    );
};

export default DeleteTheme;