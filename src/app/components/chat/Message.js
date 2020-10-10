import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css';

function Message({text, photo, timestamp, isSender}) {
    function getFormattedDate() {
        if (!timestamp) return null;

        return new Date(timestamp.toDate()).toLocaleString();
    }

    return (
        <div className={`message ${isSender ? 'isSender' : ""}`}>
            <div className="message__avatar">
                <Avatar src={photo} />
            </div>
            <p className="message__text">
                {text}
            </p>
            <span className="message__timestamp">
                {getFormattedDate()}
            </span>
        </div>
    )
}

export default Message
