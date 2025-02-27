import React, { memo } from 'react';
import Sectbar from '../Sectbar';
import Message from '../Message';

// Componente de chats activos
const ActiveChats = memo(({
    leftSidebarVisible,
    rightSidebarVisible,
    activeChats,
    username,
    onClose,
    onMinimize,
    user
}) => (
    <div className="active-chats">
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            stilos="messages-content"
        >
            {activeChats.map(friend => (
                <Message
                    myUserId={user.username}
                    key={friend.friend_id}
                    friend={friend}
                    username={username}
                    onClose={() => onClose(friend.friend_id)}
                    onMinimize={onMinimize}
                />
            ))}
        </Sectbar>
    </div>
));


export default ActiveChats;