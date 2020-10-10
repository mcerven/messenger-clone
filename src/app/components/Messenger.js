import React from 'react'
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar';
import './Messenger.css';
import { selectChannelId } from '../features/channelSlice';
import { useSelector } from 'react-redux';

function Messenger() {
    const channelId = useSelector(selectChannelId);
    
    return (
        <div className="messenger">
            <Sidebar />
            {channelId && <Chat />}
        </div>
    )
}

export default Messenger
