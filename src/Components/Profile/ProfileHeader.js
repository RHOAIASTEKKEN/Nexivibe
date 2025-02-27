import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import General from './General';
import Imagenes from './Imagenes';
import Videos from './Videos';
import Img from '../Img';

// ProfileHeader component permanece igual
const ProfileHeader = ({user}) => {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <General user={user} />;
            case 'images':
                return <Imagenes />;
            case 'videos':
                return <Videos />;
            default:
                return <General />;
        }
    };

    return (
        <div className="profile-navigation">
            <div className="post perfil-header">
                <Link
                    onClick={() => setActiveTab('general')}
                    className={activeTab === 'general' ? 'active' : ''}
                >
                    General
                </Link>
                <Link
                    onClick={() => setActiveTab('images')}
                    className={activeTab === 'images' ? 'active' : ''}
                >
                    <Img url={'/Icons/image.jpg'} alt={'image'} />
                    Image
                </Link>
                <Link
                    onClick={() => setActiveTab('videos')}
                    className={activeTab === 'videos' ? 'active' : ''}
                >
                    <Img url={'/Icons/video.jpg'} alt={'videos'} />
                    Videos
                </Link>
            </div>

            <div className="profile-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfileHeader;