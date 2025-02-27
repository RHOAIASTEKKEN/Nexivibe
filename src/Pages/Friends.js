import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import Sectbar from '../Components/Sectbar';
import FriendCard from '../Components/Friends/FriendCard';
import ActiveChats from '../Components/Friends/ActiveChats';
import '../Styles/Friends.css';

// Componente de búsqueda de amigos
const FriendSearch = memo(({ searchTerm, onSearch }) => (
    <input
        type="text"
        className="friend-search"
        placeholder="Buscar amigos..."
        value={searchTerm}
        onChange={onSearch}
    />
));

// Componente de lista de amigos
const FriendsList = memo(({ loading, error, filteredFriends, onMessageClick, currentUsername, user }) => {
    const [unreadMessages, setLocalUnreadMessages] = useState({});

    if (loading) return React.createElement('p', null, 'Cargando lista de amigos...');
    if (error) return React.createElement('div', { className: 'error' }, error);
    if (!loading && filteredFriends.length === 0) {
        return React.createElement('p', null, 'No se encontraron amigos.');
    }

    return React.createElement('div', { className: 'friends-list' },
        filteredFriends.map(friend =>
            React.createElement(FriendCard, {
                user:user,
                key: friend.friend_id,
                friend: friend,
                unreadMessages: unreadMessages,
                setUnreadMessages: setLocalUnreadMessages,
                onMessageClick: onMessageClick,
                currentUsername: currentUsername
            })
        )
    );
});


// Función principal de amigos
function Friends({ leftSidebarVisible, rightSidebarVisible, user }) {
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeChats, setActiveChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch friends desde la nueva API
    const fetchFriends = useCallback(async () => {
        if (!user?.username) {
            setError('Usuario no encontrado.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/friends', {
                params: { username: user.username },
                withCredentials: true,
            });

            const friendsData = response.data.map(friend => ({
                friend_id: friend.friend_id,
                friend_username: friend.friend_username,
                friend_name: friend.friend_name,
                profile_photo: friend.profile_photo,
                last_message_time: friend.last_message_time,
                unread_count: friend.unread_count,
            }));

            setFriends(friendsData);
            setFilteredFriends(friendsData);
            setError(null);
        } catch (err) {
            console.error('Error al cargar amigos:', err.response?.data || err.message);
            setError('No se pudo cargar la lista de amigos.');
        } finally {
            setLoading(false);
        }
    }, [user?.username]);

    const handleSearch = useCallback((e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredFriends(
            friends.filter(friend =>
                (friend.friend_name?.toLowerCase() || '').includes(term) ||
                (friend.friend_username?.toLowerCase() || '').includes(term)
            )
        );
    }, [friends]);

    const handleMessageClick = useCallback((friend) => {
        setActiveChats(prevChats => {
            if (!prevChats.find(chat => chat.friend_id === friend.friend_id)) {
                return [...prevChats, friend];
            }
            return prevChats;
        });
    }, []);

    const handleClose = useCallback((friendId) => {
        setActiveChats(prevChats =>
            prevChats.filter(chat => chat.friend_id !== friendId)
        );
    }, []);

    const handleMinimize = useCallback(() => {
        console.log('Chat minimizado');
    }, []);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    return (
        <>
            <Sectbar
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
                TituloSection="Amigos"
            >
                <FriendSearch
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                />
                <FriendsList
                    user={user}
                    loading={loading}
                    error={error}
                    filteredFriends={filteredFriends}
                    onMessageClick={handleMessageClick}
                    currentUsername={user?.username} // Pasamos directamente el username
                />
            </Sectbar>

            <ActiveChats
                user={user}
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
                activeChats={activeChats}
                username={user?.username}
                onClose={handleClose}
                onMinimize={handleMinimize}
            />
        </>
    );
}

export default Friends;
