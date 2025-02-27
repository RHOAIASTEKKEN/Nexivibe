import React from 'react';
import UserInfo from './Card/UserInfo';
import StoryContent from './Card/StoryContent';
import StoryMedia from './Card/StoryMedia';
import StoryActions from './Card/StoryActions';

const StoryCard = ({ id, user, content, media, likes, comments, created_at, datauser, openModal }) => {
    // Lista de hijos que siempre estarán en la card
    const children = [
        <UserInfo key="user" user={user} created_at={created_at} />,
        <StoryContent key="content" content={content} />,
        media.length > 0 && <StoryMedia key="media" mediaUrls={media} openModal={openModal} />,
        <StoryActions
            key="actions"
            id={id}
            likes={likes}
            comments={comments}
            datauser={datauser}
            user={user}
        />
    ].filter(Boolean); // Elimina `false` si no hay media

    return (
        <div className="story-card" id={`story-card-${id}`} data-count={children.length}>
            {children}
        </div>
    );
};

export default StoryCard;
