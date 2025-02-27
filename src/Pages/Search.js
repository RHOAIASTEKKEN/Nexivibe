import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sectbar from '../Components/Sectbar';
import '../Styles/Search.css';

// Componente para mostrar un usuario individual
function UserCard({ user, sendFriendRequest }) {
    return (
        <div className="user-card">
            <img
                src={user.profile_photo || 'ruta/por/defecto/avatar.png'}
                alt={user.name || 'Usuario'}
                className="user-avatar"
            />

            <div className="user-info">
                <h3>{user.name}</h3>
                <p>@{user.username}</p>
            </div>
            <div className="user-actions">
                {user.friendStatus === 'none' && (
                    <button
                        onClick={() => sendFriendRequest(user.id)}
                        disabled={user.friendRequestSent}
                    >
                        {user.friendRequestSent ? 'Solicitud enviada' : 'Agregar amigo'}
                    </button>
                )}
                {user.friendStatus === 'pending' && <span>Solicitud pendiente</span>}
                {user.friendStatus === 'accepted' && <span>Ya son amigos</span>}
            </div>
        </div>
    );
}

// Componente para manejar los resultados de búsqueda
function SearchResults({ searchResults, loading, error, sendFriendRequest, leftSidebarVisible, rightSidebarVisible }) {
    if (loading) {
        return <div className="loading">Buscando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!loading && !error && searchResults.length === 0) {
        return <p>No se encontraron resultados.</p>;
    }

    return (
        <>
            <Sectbar leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible}>
                {searchResults.map((user) => (
                    <UserCard key={user.id} user={user} sendFriendRequest={sendFriendRequest} />
                ))}
            </Sectbar>
        </>
    );
}

// Componente principal de búsqueda
function Search({ query, user }) {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchUsers = useCallback(async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/users/search?q=${query}`);
            const users = response.data;

            const usersWithStatus = await Promise.all(
                users.map(async (u) => {
                    try {
                        const statusResponse = await axios.get('http://localhost:3001/api/friendships/status', {
                            params: {
                                user_username: user.username,
                                friend_id: u.id,
                            },
                        });

                        return {
                            ...u,
                            friendStatus: statusResponse.data.status,
                            friendRequestSent: statusResponse.data.status === 'pending',
                        };
                    } catch {
                        return { ...u, friendStatus: 'none', friendRequestSent: false };
                    }
                })
            );

            setSearchResults(usersWithStatus);
            setError(null);
        } catch {
            setError('Error al buscar usuarios');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }, [query, user.username]);

    useEffect(() => {
        searchUsers();
    }, [searchUsers]);

    const sendFriendRequest = async (userId) => {
        if (!userId) {
            setError('ID de usuario inválido');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3001/api/friendships', {
                friend_id: userId,
                user_username: user.username,
            });

            if (response.data) {
                const updatedResults = searchResults.map((u) =>
                    u.id === userId
                        ? { ...u, friendRequestSent: true, friendStatus: 'pending' }
                        : u
                );
                setSearchResults(updatedResults);
                setError(null);
            }
        } catch {
            setError('Error al enviar solicitud de amistad');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchResults
            searchResults={searchResults}
            loading={loading}
            error={error}
            sendFriendRequest={sendFriendRequest}
        />
    );
}

// Contenedor principal de la búsqueda
function SearchContain({ leftSidebarVisible, rightSidebarVisible, query, user }) {
    return (
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            TituloSection="Resultados Búsqueda"
        >
            <Search query={query} user={user} />
        </Sectbar>
    );
}

export default SearchContain;
