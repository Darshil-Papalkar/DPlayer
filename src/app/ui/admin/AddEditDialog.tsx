import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AddEditDialogPropsType} from "@/app/lib/definitions";
import {Box} from "@mui/material";

import "./AddEditDialog.css";

const AddEditDialog = ({open, handleClose, handleSubmit, dialogComponent, dialogData}: AddEditDialogPropsType) => {
    const [seeFullText, setSeeFullText] = useState(false);
    const toggleShow = () => setSeeFullText(prevState => !prevState);

    const getIdFromDialogData = () => {
        let id = "";
        if(dialogComponent?.item?.toLocaleLowerCase().includes("web series") && "id" in dialogData.webSeries) {
            id = dialogData.webSeries.id;
        }
        else if(dialogComponent?.item?.toLocaleLowerCase().includes("movie") && "id" in dialogData.movie) {
            id = dialogData.movie.id;
        }
        else if(dialogComponent?.item?.toLocaleLowerCase().includes("genre") && "id" in dialogData.genre) {
            id = dialogData.genre.id;
        }
        else if(dialogComponent?.item?.toLocaleLowerCase().includes("theme") && "id" in dialogData.theme) {
            id = dialogData.theme.id;
        }
        else if(dialogComponent?.item?.toLocaleLowerCase().includes("all") && "id" in dialogData.allData) {
            id = dialogData.allData.id;
        }
        return id;
    };

    const isComponentDeleteScreen = () => {
        return dialogComponent?.item?.toLocaleLowerCase().includes("delete");
    };

    return (
        dialogComponent &&
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    console.log("DATA CHECK", dialogComponent, dialogData);
                    await handleSubmit(dialogComponent.item, formJson, getIdFromDialogData());
                },
            }}
        >
            <DialogTitle>{dialogComponent.title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{
                    overflow: "hidden"
                }}>
                    <div className={seeFullText ? "" : "dialog-subtext"}>
                        {dialogComponent.description}
                    </div>
                    <div style={{
                        color: "#0098f6",
                        textDecoration: "underline",
                        paddingLeft: "5px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        textAlign: "right"
                    }}
                         onClick={toggleShow}>
                        {seeFullText ? "Hide More" : "Read More"}
                    </div>
                </DialogContentText>
                <Box sx={{my: 2}}>
                    {dialogComponent.element}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button type="submit">
                    {
                        isComponentDeleteScreen() ? "Delete" : "Save"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditDialog;