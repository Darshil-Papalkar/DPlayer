import {Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import * as React from "react";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import LabelIcon from '@mui/icons-material/Label';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import {SpeedDialUpdateType} from "@/app/lib/definitions";
import {ADMIN_ACTIONS} from "@/app/lib/enums";

const AdminSpeedDial = ({selectSpeedDialItem, isOpen, handleOpen, handleClose}: SpeedDialUpdateType) => {

    const actions = [
        {icon: <MovieCreationOutlinedIcon onClick={() => selectSpeedDialItem(ADMIN_ACTIONS.ADDMOVIES)}/>, name: 'Add Movie'},
        {icon: <LiveTvOutlinedIcon onClick={() => selectSpeedDialItem(ADMIN_ACTIONS.ADDWEBSERIES)}/>, name: 'Add Web Series'},
        {
            icon: <LabelIcon
                onClick={() => selectSpeedDialItem(ADMIN_ACTIONS.ADDTHEME)}/>, name: 'Add Theme'
        },
        {
            icon: <CollectionsBookmarkOutlinedIcon
                onClick={() => selectSpeedDialItem(ADMIN_ACTIONS.ADDGENRE)}/>, name: 'Add Genre'
        },
    ];

    return (
        <>
            <Backdrop open={isOpen}/>
            <SpeedDial
                ariaLabel="Select Action"
                sx={{position: 'fixed', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={isOpen}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={<span style={{textWrap: "nowrap"}}>{action.name}</span>}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default AdminSpeedDial;