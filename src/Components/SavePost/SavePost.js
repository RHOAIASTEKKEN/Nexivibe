import React, { useState } from 'react';
import '../../Styles/SavePost.css';
import '../Story/StoryComponent.css';
import HeaderSavePost from './HeaderSavePost';
import Sectbar from '../Sectbar';
import { motion } from 'framer-motion';

function SavePost({ leftSidebarVisible, rightSidebarVisible, user }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const openModal = (images, index) => {
        setSelectedImages(images);
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);
    };

    const handleDragEnd = (e, info) => {
        if (info.offset.x < -100) {
            nextImage();
        } else if (info.offset.x > 100) {
            prevImage();
        }
    };

    return (
        <div className='savepost'>
            <Sectbar
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
            >
                <HeaderSavePost user={user} openModal={openModal} />

                {isModalOpen && (
                    <div
                        className="modal-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                        onClick={closeModal}
                    >
                        <motion.img
                            className="modal-image"
                            src={`http://localhost:3001${selectedImages[currentIndex]}`}
                            alt={`Contenido ${currentIndex + 1}`}
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                borderRadius: '8px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            onDragEnd={handleDragEnd}
                        />

                        {selectedImages.length > 1 && (
                            <>
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '20px',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        padding: '10px'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                >
                                    ⬅️
                                </button>

                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '20px',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        padding: '10px'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                >
                                    ➡️
                                </button>
                            </>
                        )}
                    </div>
                )}
            </Sectbar>
        </div>
    );
}

export default SavePost;