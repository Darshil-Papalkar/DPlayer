import React from "react";
import TextField from "@mui/material/TextField";
import {DialogEvent} from "@/app/lib/definitions";


const AddTheme = () => {
    return (
        <>
            <TextField
                autoFocus
                id="themeName"
                name="themeName"
                label="Add Theme"
                type="text"
                defaultValue=""
                helperText="Enter Theme Name separated by Comma(,)"
                required
                fullWidth
            />
        </>
    );
};

export default AddTheme;