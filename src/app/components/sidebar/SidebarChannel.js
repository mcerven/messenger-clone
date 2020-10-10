import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannelId, setChannel } from '../../features/channelSlice';
import { db } from '../../../firebase';
import './SidebarChannel.css';
import SidebarChannelOptions from './SidebarChannelOptions';

function SidebarChannel({id, name}) {
    const selectedChannelId = useSelector(selectChannelId);
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState(null);
    
    function selectChannel() {
        dispatch(setChannel({id, name}));
    }

    useEffect(() => {
        const dbChannel = db.collection('channels').doc(id);
        const dbChannelMessages = dbChannel.collection('messages')
            .orderBy('timestamp', 'desc');

        dbChannelMessages.onSnapshot(snapshot => {
            const newDbMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }));
            const lastDbMessage = newDbMessages && newDbMessages.length > 0 ? newDbMessages[0] : null;
            setLastMessage(lastDbMessage);
        });
    }, [id]);

    function getFormattedText() {
        const lastMessageText = lastMessage?.data.text;
        if (!lastMessageText?.length) return '';

        const maxLength = 20;
        if (lastMessageText.length <= maxLength)
            return lastMessageText;

        return lastMessageText.slice(0, maxLength) + '...';
    }

    function getFormattedDate() {
        if (!lastMessage?.data.timestamp) return null;

        return new Date(lastMessage.data.timestamp.toDate()).toLocaleDateString();
    }
    
    return (
        <div
            className={`sidebarChannel ${selectedChannelId === id && 'selected'}`}
            onClick={selectChannel}>
            <Avatar />
            <div className="sidebarChannel__messageInfo">
                <span className="sidebarChannel__name">{name}</span>
                {lastMessage && (
                    <div className="sidebarChannel__lastMessage">
                        {getFormattedText()}<span> · </span>{getFormattedDate()}
                    </div>
                )}
            </div>
            <SidebarChannelOptions id={id} />
        </div>
    )
}

export default SidebarChannel
