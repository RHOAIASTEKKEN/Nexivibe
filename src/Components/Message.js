import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import '../Styles/MessagesChat.css';

const MessageBubble = memo(({ message, isReceived }) => (
    <div className={`message ${isReceived ? 'received' : 'sent'}`}>
        <p>{message.content}</p>
        <span className="message-time">
            {new Date(message.timestamp).toLocaleTimeString()}
        </span>
    </div>
));

const ChatHeader = memo(({ friend, onClose }) => (
    <div className="message-header">
        <img
            src={`http://localhost:3001${friend.profile_photo}`}
            alt={friend.friend_name}
            className="message-avatar"
        />
        <span>{friend.friend_name}</span>
        <div className="message-actions">
            <button onClick={onClose}>×</button>
        </div>
    </div>
));

function Message({ friend, username, onClose, myUserId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/messages/${friend.friend_id}?username=${username}`,
                { credentials: 'include' }
            );

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                scrollToBottom();
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [friend.friend_id, username, scrollToBottom]);

    const sendMessage = useCallback(async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch('http://localhost:3001/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    senderId: myUserId,
                    recipientId: friend.friend_id,
                    content: newMessage.trim()
                }),                
            });

            if (response.ok) {
                const message = await response.json();
                setMessages(prev => [...prev, message]);
                setNewMessage('');
                scrollToBottom();
            } else {
                const errorData = await response.json();
                console.error('Error sending message:', errorData);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [newMessage, myUserId, friend.friend_id, scrollToBottom]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }, [sendMessage]);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    useEffect(() => {
        if (friend.friend_id) {
            fetch(`http://localhost:3001/api/messages/read/${friend.friend_id}?username=${username}`, {
                method: 'PUT',
                credentials: 'include'
            }).catch(error => console.error('Error marking messages as read:', error));
        }
    }, [friend.friend_id, username]);

    return (
        <div className="message-container">
            <ChatHeader
                friend={friend}
                onClose={onClose}
            />

            <div className="message-content">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isReceived={msg.sender_id === friend.friend_id}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
}

export default Message;