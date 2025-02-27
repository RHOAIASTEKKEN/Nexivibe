import React, { memo, useEffect, useState } from 'react';
import UnreadCount from './UnreadCount';

const FriendCard = memo(({
    friend,
    unreadMessages,
    setUnreadMessages,
    onMessageClick,
    currentUsername,
    user
}) => {
    const [myUserId, setMyUserId] = useState(null);
    const [refreshUnreadCount, setRefreshUnreadCount] = useState(false); // Nuevo estado para forzar re-renderización

    useEffect(() => {
        if (user?.username) {
            fetch('http://localhost:3001/getUserId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        setMyUserId(data.id);
                    }
                })
                .catch(error => console.error('Error fetching user ID:', error));
        }
    }, [user]);

    // Agregar efecto para actualizar el contador de mensajes no leídos
    useEffect(() => {
        const updateUnreadCount = () => {
            if (myUserId && friend.friend_id) {
                fetch('http://localhost:3001/api/messages/unread-count', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senderId: friend.friend_id,
                        recipientId: myUserId
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        setUnreadMessages(prev => ({
                            ...prev,
                            [friend.friend_id]: data.unreadCount
                        }));
                    })
                    .catch(error => console.error('Error updating unread count:', error));
            }
        };

        // Actualizar contador de mensajes no leídos cuando cambia el myUserId o el friendId
        updateUnreadCount();

        // Establecer intervalo para actualizaciones
        const intervalId = setInterval(updateUnreadCount, 60000);

        // Cleanup al desmontar
        return () => clearInterval(intervalId);
    }, [myUserId, friend.friend_id, setUnreadMessages]);

    const handleMarkAsRead = async () => {
        try {
            if (friend.unread_count > 0) {
                await fetch('http://localhost:3001/api/messages/mark-read', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: currentUsername,
                        senderUsername: friend.friend_username,
                    }),
                });
                console.log('Mensajes marcados como leídos');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleClick = () => {
        onMessageClick(friend);
        handleMarkAsRead();
        setRefreshUnreadCount(prev => !prev); // Forzar actualización del componente UnreadCount
    };

    return React.createElement('div', { className: 'friend-card' },
        React.createElement('img', {
            src: `http://localhost:3001${friend.profile_photo || '/default-avatar.png'}`,
            alt: friend.friend_name || 'Amigo',
            className: 'friend-avatar'
        }),
        React.createElement('div', { className: 'friend-info' },
            React.createElement('h3', null, friend.friend_name),
            React.createElement('p', null, `@${friend.friend_username}`),
            React.createElement('section', { className: 'friend-actions-message' },
                React.createElement('i', {
                    className: 'fa-solid fa-message',
                    role: 'button',
                    tabIndex: 0,
                    onClick: handleClick,
                    onKeyPress: (e) => e.key === 'Enter' && handleClick()
                }),
                currentUsername && myUserId && React.createElement(UnreadCount, {
                    senderId: friend.friend_id,
                    recipientId: friend.id,
                    unreadMessages: unreadMessages,
                    setUnreadMessages: setUnreadMessages,
                    myUserId: myUserId,
                    refreshUnreadCount // Pasar el estado de actualización
                })
            )
        )
    );
});

export default FriendCard;
