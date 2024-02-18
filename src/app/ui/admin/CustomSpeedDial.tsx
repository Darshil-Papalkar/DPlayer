import {Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import * as React from "react";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import {SpeedDialUpdateType} from "@/app/lib/definitions";

const CustomSpeedDial = (props: SpeedDialUpdateType) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actions = [
        {icon: <MovieCreationOutlinedIcon onClick={() => props.selectSpeedDialItem("addmovies")}/>, name: 'Add Movie'},
        {icon: <LiveTvOutlinedIcon onClick={() => props.selectSpeedDialItem("addwebseries")}/>, name: 'Add Web Series'},
        {
            icon: <CategoryOutlinedIcon
                onClick={() => props.selectSpeedDialItem('addcategory')}/>, name: 'Add Category Type'
        },
        {
            icon: <CollectionsBookmarkOutlinedIcon
                onClick={() => props.selectSpeedDialItem("addgenre")}/>, name: 'Add Genre Type'
        },
    ];

    return (
        <>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel="Select Action"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
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

export default CustomSpeedDial;