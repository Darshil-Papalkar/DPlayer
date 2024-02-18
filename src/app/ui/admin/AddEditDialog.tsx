import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AddEditDialogPropsType} from "@/app/lib/definitions";

const AddEditDialog = ({open, handleClose, dialogComponent}: AddEditDialogPropsType) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>{dialogComponent?.title}</DialogTitle>
            <DialogContent>
            {/*    <DialogContentText>*/}
            {/*        To subscribe to this website, please enter your email address here. We*/}
            {/*        will send updates occasionally.*/}
            {/*    </DialogContentText>*/}
            {/*    <TextField*/}
            {/*        autoFocus*/}
            {/*        required*/}
            {/*        margin="dense"*/}
            {/*        id="name"*/}
            {/*        name="email"*/}
            {/*        label="Email Address"*/}
            {/*        type="email"*/}
            {/*        fullWidth*/}
            {/*        variant="standard"*/}
            {/*    />*/}
                {dialogComponent?.element}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditDialog;