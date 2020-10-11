import React, { useState } from 'react';
import './SidebarChannelOptions.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { db } from '../../../firebase';

function SidebarChannelOptions({id}) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closeMenu = () => {
        setAnchorEl(null);
    }

    const deleteChannel = async () => {
        await db.collection('channels').doc(id).delete();

        closeMenu();
    };

    return (
        <div className="sidebarChannelOptions">
            <IconButton className="sidebarChannelOptions__button" onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                <MenuItem onClick={deleteChannel}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SidebarChannelOptions
