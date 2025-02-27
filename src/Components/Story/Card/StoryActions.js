import React, { useState, useEffect } from 'react';
import BookmarkIcon from './BookmarkIcon';
import CommentsModal from '../Comments/CommentsModal';

const StoryActions = ({
    id,
    likes: initialLikes,
    comments: initialComments,
    datauser,
    imageUrl, user
}) => {
    const [likes, setLikes] = useState(initialLikes || 0);
    const [comments, setComments] = useState(initialComments || 0);
    const [isLiked, setIsLiked] = useState(false); // Estado inicial modificado dinámicamente
    const [isBookmarked, setIsBookmarked] = useState(false); // Estado inicial modificado dinámicamente
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [showCommentsModal, setShowCommentsModal] = useState(false);

    // Cargar el estado inicial de like/bookmark y los contadores
    useEffect(() => {
        const fetchPostStatusAndCounts = async () => {
            try {
                // Verificar el estado inicial de like y bookmark
                const statusResponse = await fetch(`http://localhost:3001/api/posts/${id}/status?username=${datauser}`, {
                    method: 'GET', // Cambiado de POST a GET
                });
    
                if (!statusResponse.ok) {
                    throw new Error(`HTTP error! status: ${statusResponse.status}`);
                }
    
                const statusData = await statusResponse.json();
                setIsLiked(statusData?.isLiked || false);
                setIsBookmarked(statusData?.isBookmarked || false);
    
                // Obtener la cantidad total de bookmarks
                const bookmarkResponse = await fetch(`http://localhost:3001/api/posts/${id}/bookmark-count`);
                const bookmarkData = await bookmarkResponse.json();
    
                if (bookmarkResponse.ok) {
                    setBookmarkCount(bookmarkData.totalBookmarks);
                }
    
                // Obtener la cantidad total de comentarios
                const commentsResponse = await fetch(`http://localhost:3001/api/posts/${id}/comments-count`);
                const commentsData = await commentsResponse.json();
    
                if (commentsResponse.ok) {
                    setComments(commentsData.totalComments);
                }
            } catch (error) {
                console.error('Error al cargar el estado inicial:', error);
            }
        };
    
        fetchPostStatusAndCounts();
    }, [id, datauser]);    

    // Manejo de likes
    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: datauser }),
            });

            if (response.ok) {
                setLikes((prev) => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: datauser }),
            });

            if (response.ok) {
                setLikes((prev) => prev - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Error al quitar like:', error);
        }
    };

    // Manejo de bookmarks
    const handleBookmark = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}/bookmark`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: datauser }),
            });

            if (response.ok) {
                setIsBookmarked((prev) => !prev);
                setBookmarkCount((prev) => (isBookmarked ? prev - 1 : prev + 1));
            }
        } catch (error) {
            console.error('Error al guardar bookmark:', error);
        }
    };

    return (
        <>
            <div className="story-actions">
                <button
                    className={`action-button ${isLiked ? 'action-button-active' : ''}`}
                    onClick={isLiked ? handleUnlike : handleLike}
                >
                    <span className="icon-post icon-heart"></span>
                    <span>{likes}</span>
                </button>
                <button
                    className="action-button"
                    onClick={() => setShowCommentsModal((prev) => !prev)}
                >
                    <span className="icon-post icon-comment"></span>
                    <span>{comments}</span>
                </button>
                <button
                    className={`action-button ${isBookmarked ? 'action-btn-save' : ''}`}
                    onClick={handleBookmark}
                >
                    <BookmarkIcon />
                    <span className="bookmark-count">{bookmarkCount}</span>
                </button>
            </div>

            {showCommentsModal && (
                <CommentsModal
                    postId={id}
                    username={datauser}
                    imageUrl={imageUrl}
                    onClose={() => setShowCommentsModal(false)}
                    user={user}
                />
            )}
        </>
    );
};

export default StoryActions;
