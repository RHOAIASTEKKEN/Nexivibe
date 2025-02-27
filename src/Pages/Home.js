import React, { useState, useEffect } from 'react';
import '../Styles/Home.css';
import '../Styles/Btn.css';

// Import components
import View from '../Components/View';
import Following from '../Components/Following';
import SearchContain from './Search';
import Header from '../Components/Header';
import Friends from './Friends';
import EditProfile from './EditProfile';
import SavePost from '../Components/SavePost/SavePost';
import ArtistRegistrationForm from '../Components/Music/ArtistRegistrationForm';
import StreamingPlatform from '../Stream/StreamingPlatform';
import MenuLateral from '../Components/Menu/MenuLateral';
import MusicPlayer from '../Components/Reproductor/MusicPlayer';

function Home({ user, handleLogout }) {
    const [leftSidebarVisible, setLeftSidebarVisible] = useState(
        JSON.parse(localStorage.getItem('leftSidebarVisible')) || false
    );
    const [rightSidebarVisible, setRightSidebarVisible] = useState(
        JSON.parse(localStorage.getItem('rightSidebarVisible')) || false
    );
    const [currentView, setCurrentView] = useState(
        localStorage.getItem('currentView') || 'home'
    );
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');


    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('leftSidebarVisible', JSON.stringify(leftSidebarVisible));
    }, [leftSidebarVisible]);

    useEffect(() => {
        localStorage.setItem('rightSidebarVisible', JSON.stringify(rightSidebarVisible));
    }, [rightSidebarVisible]);

    useEffect(() => {
        localStorage.setItem('currentView', currentView);
    }, [currentView]);

    useEffect(() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery]);

    const toggleLeftSidebar = () => {
        setLeftSidebarVisible(!leftSidebarVisible);
        if (!leftSidebarVisible) setRightSidebarVisible(false);
    };

    const toggleRightSidebar = () => {
        setRightSidebarVisible(!rightSidebarVisible);
        if (!rightSidebarVisible) setLeftSidebarVisible(false);
    };

    const renderCentralContent = () => {
        const centralContentClasses = `home-central-content ${!leftSidebarVisible ? 'sidebar-left-hidden' : ''} ${!rightSidebarVisible ? 'sidebar-right-hidden' : ''}`;
        return (
            <div className={centralContentClasses}>
                {(() => {
                    switch (currentView) {
                        case 'home':
                            return <View leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} user={user} />;
                        case 'search':
                            return <SearchContain query={searchQuery} user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'following':
                            return <Following />;
                        case 'friends':
                            return <Friends user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'editar':
                            return <EditProfile user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'savepost':
                            return <SavePost user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'music':
                            return <ArtistRegistrationForm user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'stream':
                            return <StreamingPlatform user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        case 'video':
                            return <MusicPlayer user={user} leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} />;
                        default:
                            return <View leftSidebarVisible={leftSidebarVisible} rightSidebarVisible={rightSidebarVisible} user={user} />;
                    }
                })()}
            </div>
        );
    };

    return (
        <div className="home-container">
            <Header user={user} />

            <div className="home-content">
                <button
                    className={`sidebar-toggle left-toggle ${leftSidebarVisible ? 'visible' : 'hidden'}`}
                    onClick={toggleLeftSidebar}
                >
                    {leftSidebarVisible ? '◀' : '▶'}
                </button>

                {leftSidebarVisible && (
                    <MenuLateral
                        leftSidebarVisible={leftSidebarVisible}
                        user={user}
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                        setSearchQuery={setSearchQuery}
                        mapUse="menuItems"
                    />
                )}

                {renderCentralContent()}

                <button
                    className={`sidebar-toggle right-toggle ${rightSidebarVisible ? 'visible' : 'hidden'}`}
                    onClick={toggleRightSidebar}
                >
                    {rightSidebarVisible ? '▶ ' : '◀ '}
                </button>

                {rightSidebarVisible && (
                    <>
                        <MenuLateral
                            mapUse="menuItemsRight"
                            rightSidebarVisible={rightSidebarVisible}
                            currentView={currentView}
                            setCurrentView={setCurrentView}
                            user={user}
                            handleLogout={handleLogout}
                        />

                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
