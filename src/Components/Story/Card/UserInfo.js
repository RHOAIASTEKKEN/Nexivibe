import React from 'react';

const UserInfo = ({ user, created_at }) => {
    const userImage = user.profile_photo
        ? `http://localhost:3001${user.profile_photo}`
        : null;

    return (
        <div className="user-info">
            {userImage ? (
                <img
                    className="user-avatar"
                    src={userImage}
                    alt={user.username}
                />
            ) : (
                <div className="user-avatar">
                    {user.username ? user.username[0].toUpperCase() : '?'}
                </div>
            )}
            <div className="user-details">
                <span className="user-name">{user.username}</span>
                <span className="timestamp">{created_at}</span>
            </div>
        </div>
    );
};

export default UserInfo;