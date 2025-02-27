import React, { useEffect, useState } from 'react';
import StoryCard from './StoryCard';

const formatDateToMexicoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

const StoryCardData = ({ user, customUrl, openModal, optionSaveOrLike }) => {
    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            console.error('No user data provided:', user);
            setError('Es necesario proporcionar datos del usuario.');
            setIsLoading(false);
            return;
        }

        const fetchPostData = async () => {
            try {
                const url = customUrl || `http://localhost:3001/api/user/friends-post?username=${user.username}`;
                const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });

                if (!response.ok) {
                    if (response.status === 404) {
                        setPostData([]); // Set empty array for 404
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPostData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error en fetchPostData:', error);
                setPostData([]); // Set empty array on error
                setError('Hubo un error al cargar los datos.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostData();
    }, [user, customUrl]);

    if (isLoading) return <div>Cargando datos, por favor espera...</div>;
    if (error) return <div>{error}</div>;
    if (!postData || postData.length === 0) {
        return <div>No tienes Posts para mostrar.</div>;
    }

    // Determinar si los datos provienen de amigos o de un usuario individual
    const isFriendsData = Array.isArray(postData) && postData.some(friend => friend.posts);

    // Si postData es un array (múltiples posts de amigos)
    if (Array.isArray(postData)) {
        return (
            <>
                {isFriendsData ? (
                    // Manejo cuando los datos provienen de amigos
                    postData.map((friendData) => {
                        const friendUniqueId = `friend-${friendData.friend_id}-${friendData.username}`;
                        
                        return (
                            <div className='prev-story-card' key={friendUniqueId}>
                                {Array.isArray(friendData.posts) && friendData.posts.length > 0 ? 
                                    friendData.posts.map((post) => {
                                        const postUniqueId = `${friendUniqueId}-post-${post.id}-${post.created_at}`;
                                        
                                        return (
                                            <StoryCard
                                                key={postUniqueId}
                                                id={post.id}
                                                user={{
                                                    username: post.username,
                                                    profile_photo: post.profile_photo
                                                }}
                                                content={post.text}
                                                media={post.image_urls}
                                                likes={post.likes}
                                                comments={post.comment}
                                                created_at={formatDateToMexicoTime(post.created_at)}
                                                datauser={user.username}
                                                openModal={openModal}
                                            />
                                        );
                                    }) 
                                    : <div>No tienes Posts para mostrar.</div>
                                }
                            </div>
                        );
                    })
                ) : (
                    // Manejo cuando los datos provienen directamente de un usuario
                    <div className='prev-story-card'>
                        {postData.length > 0 ? 
                            postData.map((post) => {
                                const postUniqueId = `user-post-${post.id}-${post.created_at}`;
                                
                                return (
                                    <StoryCard
                                        key={postUniqueId}
                                        id={post.id}
                                        user={{
                                            username: post.username,
                                            profile_photo: post.profile_photo
                                        }}
                                        content={post.text}
                                        media={post.image_urls}
                                        likes={post.likes}
                                        comments={post.comment}
                                        created_at={formatDateToMexicoTime(post.created_at)}
                                        datauser={user.username}
                                        openModal={openModal}
                                    />
                                );
                            })
                            : <div>No tienes Posts para mostrar.</div>
                        }
                    </div>
                )}
            </>
        );
    }

    return <div>No tienes Posts para mostrar.</div>;
};

export default StoryCardData;