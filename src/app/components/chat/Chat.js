import React from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import NewMessage from './NewMessage';

function Chat() {
    return (
        <div className="chat">
            <ChatHeader />
            <Messages />
            <NewMessage />
        </div>
    )
}

export default Chat
