import React, { useState, useEffect, useRef } from 'react';
import './MenuLeft.css';
import NotificationUser from '../NotificationUser';
import ImgProfile from '../../Pages/ImgProfile';

const MenuLateral = ({ rightSidebarVisible, leftSidebarVisible, user, currentView, setCurrentView, setSearchQuery, handleLogout, mapUse }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const searchContainerRef = useRef(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (localSearchQuery.trim()) {
            setSearchQuery(localSearchQuery);
            setCurrentView('search');
            setIsSearchOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setLocalSearchQuery(e.target.value);
    };

    const toggleSearch = (e) => {
        e.stopPropagation();
        setIsSearchOpen(!isSearchOpen);
    };

    const SearchForm = () => (
        <div className="search-dropdown">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    value={localSearchQuery}
                    onChange={handleInputChange}
                    placeholder="Buscar..."
                    className="search-input"
                    autoFocus
                />
                <button
                    type="submit"
                    className="search-submit"
                >
                    Buscar
                </button>
            </form>
        </div>
    );

    const menuItemsRight = [
        { 
            id: 'edit-profile',
            label: 'Editar Perfil', 
            action: () => setCurrentView('editar') 
        },
        { 
            id: 'settings',
            label: 'Configuración', 
            action: () => {} // Empty function instead of null
        },
        { 
            id: 'videos-save',
            label: 'Videos save', 
            action: () => {} // Empty function instead of null
        },
        { 
            id: 'post-save',
            label: 'Post Save', 
            action: () => setCurrentView('savepost') 
        },
        { 
            id: 'logout',
            label: 'CERRAR SESION', 
            action: () => handleLogout(), 
            isButton: true 
        }
    ];

    const menuItems = [
        {
            id: 'home',
            label: 'Home',
            icon: <i className="fa-solid fa-house"></i>,
            onClick: () => setCurrentView('home')
        },
        {
            id: 'notifications',
            label: 'Notificaciones',
            icon: <img src="/Icons/bell.jpg" alt="notificaciones" className="icon" />,
            onClick: () => setShowNotifications(!showNotifications),
            additionalContent: showNotifications && <NotificationUser user={user} />
        },
        {
            id: 'search',
            label: 'Search',
            icon: <img src="/Icons/search.webp" alt="search" className="icon" />,
            onClick: toggleSearch,
            additionalContent: isSearchOpen && <SearchForm />
        },
        {
            id: 'friends',
            label: 'Messages',
            icon: <img src="/Icons/friend.webp" alt="friends" className="icon" />,
            onClick: () => setCurrentView('friends')
        },
        {
            id: 'music',
            label: 'Music',
            icon: <img src="/Icons/Music.webp" alt="Music" className="icon" />,
            onClick: () => setCurrentView('music')
        },
        {
            id: 'game',
            label: 'Game',
            icon: <img src="/Icons/game.jpg" alt="game" className="icon" />,
            onClick: () => setCurrentView('game')
        },
        {
            id: 'video',
            label: 'Video',
            icon: <img src="/Icons/video.jpg" alt="video" className="icon" />,
            onClick: () => setCurrentView('video')
        }
    ];

    const activeMenuItems = mapUse === 'menuItemsRight' ? menuItemsRight : menuItems;

    useEffect(() => {
        localStorage.setItem('currentView', currentView);
    }, [currentView]);

    const MenuItem = ({ item }) => {
        if (mapUse === 'menuItemsRight') {
            return (
                <li className="menu-item">
                    <button
                        className={`menu-button ${item.isButton ? 'button-style' : ''}`}
                        onClick={item.action} // This is now guaranteed to be a function
                    >
                        {item.label}
                    </button>
                </li>
            );
        }

        return (
            <li className="menu-item">
                {item.id === 'search' ? (
                    <div className="search-container" ref={searchContainerRef}>
                        <button className="menu-button" onClick={item.onClick}>
                            {item.icon}
                            {item.label}
                        </button>
                        {item.additionalContent}
                    </div>
                ) : (
                    <>
                        <button className="menu-button" onClick={item.onClick}>
                            {item.icon}
                            {item.label}
                        </button>
                        {item.additionalContent}
                    </>
                )}
            </li>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    const containerClasses = mapUse === 'menuItemsRight'
        ? `home-sidebar right-sidebar ${!rightSidebarVisible ? 'hidden' : ''}`
        : `cardMenu home-sidebar left-sidebar ${!leftSidebarVisible ? 'hidden' : ''}`;

    return (
        <div className={containerClasses}>
            {mapUse === 'menuItemsRight' && user && (
                <div className="profile-section">
                    <ImgProfile
                        username={user.username}
                        classImg='profile-image'
                        useOnError={false}
                    />
                    <h2>{user.name}</h2>
                </div>
            )}
            <ul className="menu-list">
                {activeMenuItems.map((item, index) => (
                    <MenuItem key={item.id || index} item={item} />
                ))}
            </ul>
        </div>
    );
};

export default MenuLateral;