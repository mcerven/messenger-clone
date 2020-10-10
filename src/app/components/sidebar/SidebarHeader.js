import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { RateReview, Settings } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth, db } from '../../../firebase';
import './SidebarHeader.css';

function SidebarHeader() {
    const user = useSelector(selectUser);

    const signOut = () => {
        auth.signOut();
    }

    function addChannel() {
        const name = prompt('Enter new channel name');

        if (!name) return;

        db.collection('channels').add({
            name
        });
    }

    return (
        <div className="sidebarHeader">
            <Tooltip title="Logout">
                <IconButton onClick={signOut}>
                    <Avatar src={user.photo} />
                </IconButton>
            </Tooltip>
            <h1>Chats</h1>
            <Tooltip title="Settings">
                <IconButton>
                    <Settings />
                </IconButton>
            </Tooltip>
            <Tooltip title="New Channel">
                <IconButton onClick={addChannel}>
                    <RateReview />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default SidebarHeader
