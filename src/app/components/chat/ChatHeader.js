import { IconButton, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectChannelName } from '../../features/channelSlice';
import './ChatHeader.css';

function ChatHeader() {
    const channelName = useSelector(selectChannelName);
    
    return (
        <div className="chatHeader">
            <h2 className="chatHeader__channelName">{channelName}</h2>
            <Tooltip title="Conversation Information">
                <IconButton>
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ChatHeader
