import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {AdminDialogData, Theme} from "@/app/lib/definitions";


const EditTheme = ({dialogData}: { dialogData: AdminDialogData }) => {
    const [inputValue, setInputValue] = useState("themeName" in dialogData.theme ? dialogData.theme.themeName : "");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <TextField
                autoFocus
                id="themeName"
                name="themeName"
                label="Edit Theme"
                type="text"
                value={inputValue}
                onChange={onChange}
                helperText="Enter Theme Name"
                required
                fullWidth
            />
        </>
    );
};

export default EditTheme;