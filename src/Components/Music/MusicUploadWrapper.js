// MusicUploadWrapper.jsx
import React, { useState } from 'react';
import CreatorMusicCreate from './CreatorMusicCreate';
import '../../Styles/MusicUploadWrapper.css';

const MusicUploadWrapper = ({user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className="neon-button"
                onClick={() => setIsModalOpen(true)}
            >
                <span className="neon-text">Subir Canción</span>
            </button>

            <div className={`modal ${isModalOpen ? 'active' : ''}`}>
                <div className="modal-content">
                    <button
                        className="close-button"
                        onClick={() => setIsModalOpen(false)}
                    >
                        ×
                    </button>
                    <CreatorMusicCreate user={user}/>
                </div>
            </div>
        </>
    );
};

export default MusicUploadWrapper;