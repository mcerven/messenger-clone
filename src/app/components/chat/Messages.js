import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../../features/channelSlice';
import { selectUser } from '../../features/userSlice';
import { db } from '../../../firebase';
import Message from './Message';
import './Messages.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!channelId) {
            setMessages([]);
            return;
        }

        const dbChannel = db.collection('channels').doc(channelId);
        const dbChannelMessages = dbChannel.collection('messages')
            .orderBy('timestamp', 'asc');

        dbChannelMessages.onSnapshot(snapshot => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }));

            setMessages(newMessages);
        });
    }, [channelId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView();
    }

    return (
        <div className="messages">
            {messages.map(({id, data: {text, photo, timestamp, uid, }}) => (
                <Message
                    key={id}
                    text={text}
                    photo={photo}
                    isSender={uid === user.uid}
                    timestamp={timestamp} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages
