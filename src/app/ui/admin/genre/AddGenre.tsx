import TextField from "@mui/material/TextField";
import React from "react";


const AddGenre = () => {
    return (
        <>
            <TextField
                autoFocus
                id="genreName"
                name="genreName"
                label="Add Genre"
                type="text"
                defaultValue=""
                helperText="Enter Genre Name separated by Comma(,)"
                required
                fullWidth
            />
        </>
    );
};

export default AddGenre;