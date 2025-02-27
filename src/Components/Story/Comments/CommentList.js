import React, { useState, useEffect } from 'react';

const CommentList = ({ comments }) => {
    const [profilePhotos, setProfilePhotos] = useState({});

    const fetchProfilePhoto = async (username) => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${username}/profile-photo`);
            const data = await response.json();
            
            // console.log(`Datos de foto de perfil para ${username}:`, data);  
            
            if (data.profile_photo) {
                setProfilePhotos((prevState) => ({
                    ...prevState,
                    [username]: data.profile_photo
                }));
            }
        } catch (error) {
            console.error('Error fetching profile photo:', error);
        }
    };

    useEffect(() => {
        comments.forEach((comment) => {
            if (!profilePhotos[comment.username]) {
                fetchProfilePhoto(comment.username);
            }
        });
    }, [comments, profilePhotos]);

    return (
        <div className="comments-list">
            {comments.map((comment) => {
                const userImage = profilePhotos[comment.username] 
                    ? `http://localhost:3001${profilePhotos[comment.username]}` 
                    : '/default-avatar.jpg';

                return (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-user-info">
                            <img
                                src={userImage}
                                alt={comment.username}
                                className="comment-user-avatar"
                            />
                            <strong>{comment.username}</strong>
                            <small>{new Date(comment.date_comment).toLocaleString()}</small>
                        </div>
                        <p className='comment-user-comment'>{comment.comment}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;