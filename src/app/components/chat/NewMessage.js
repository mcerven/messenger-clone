import React, { useState } from 'react';
import firebase, { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../../features/channelSlice';
import { selectUser } from '../../features/userSlice';
import './NewMessage.css';
import CustomInput from '../common/CustomInput';
import { IconButton, Tooltip } from '@material-ui/core';
import { Send } from '@material-ui/icons';

export default function NewMessage() {
    const [text, setText] = useState('');
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    
    function submitMessage(e) {
        e.preventDefault();
        if (!text) return;

        db.collection('channels').doc(channelId)
            .collection('messages').add({
                text,
                uid: user.uid,
                displayName: user.displayName,
                photo: user.photo,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        
        setText('');
    }

    return (
        <form className="newMessage" onSubmit={submitMessage}>
            <CustomInput
                placeholder="Type a message..."
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={!channelId} />
            <Tooltip title="Send">
                <IconButton type="submit">
                    <Send />
                </IconButton>
            </Tooltip>
        </form>
    )
}
