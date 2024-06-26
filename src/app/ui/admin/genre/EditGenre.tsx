import {AdminDialogData, Genre, Theme} from "@/app/lib/definitions";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";


const EditGenre = ({dialogData}: { dialogData: AdminDialogData }) => {
    const [inputValue, setInputValue] = useState("genreName" in dialogData.genre ? dialogData.genre.genreName : "");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <>
            <TextField
                autoFocus
                id="genreName"
                name="genreName"
                label="Edit Genre"
                type="text"
                value={inputValue}
                onChange={onChange}
                helperText="Enter Genre Name"
                required
                fullWidth
            />
        </>
    );
};

export default EditGenre;