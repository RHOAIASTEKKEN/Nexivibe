import React, { useState } from 'react';
import StoryCardData from '../Story/StoryCardData';

const HeaderSavePost = ({ user, openModal }) => {
    const [currentView, setCurrentView] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const Save = 'SAVE';
    const likes = 'LIKES';

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentView === 0) {
            setCurrentView(1);
        }
        if (isRightSwipe && currentView === 1) {
            setCurrentView(0);
        }
    };

    const handleButtonClick = (index) => {
        setCurrentView(index);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '90%',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
                marginBottom: '16px'
            }}>
                <button
                    onClick={() => handleButtonClick(0)}
                    style={{
                        fontWeight: '600',
                        fontSize: '18px',
                        color: currentView === 0 ? '#3B82F6' : '#9CA3AF',
                        transition: 'color 0.3s ease',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {Save}
                </button>
                <button
                    onClick={() => handleButtonClick(1)}
                    style={{
                        fontWeight: '600',
                        fontSize: '18px',
                        color: currentView === 1 ? '#3B82F6' : '#9CA3AF',
                        transition: 'color 0.3s ease',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {likes}
                </button>
            </div>

            {/* Swipeable container */}
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    flex: 1
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.3s ease-out',
                        transform: `translateX(-${currentView * 100}%)`,
                        height: '100%'
                    }}
                >
                    {/* SAVE view */}
                    <div style={{
                        minWidth: '100%',
                        height: '500px',
                        overflowY: 'auto'
                    }}>
                        <div className='container-post-views' style={{
                            backgroundColor: 'var(--background-dark)',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <StoryCardData
                                user={user}
                                openModal={openModal}
                                customUrl={`http://localhost:3001/api/user/friends-post-save?username=${user.username}`}
                                optionSaveOrLike={Save}
                            />
                        </div>
                    </div>

                    {/* LIKE view */}
                    <div style={{
                        minWidth: '100%',
                        height: '500px',
                        overflowY: 'auto'
                    }}>
                        <div className='container-post-views' style={{
                            backgroundColor: 'var(--background-dark)',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <StoryCardData
                                user={user}
                                openModal={openModal}
                                customUrl={`http://localhost:3001/api/user/friends-post-like?username=${user.username}`}
                                optionSaveOrLike={likes}
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation indicators */}
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                }}>
                    <div style={{
                        height: '8px',
                        width: '8px',
                        borderRadius: '50%',
                        backgroundColor: currentView === 0 ? '#3B82F6' : '#D1D5DB',
                        transition: 'background-color 0.3s ease'
                    }}></div>
                    <div style={{
                        height: '8px',
                        width: '8px',
                        borderRadius: '50%',
                        backgroundColor: currentView === 1 ? '#3B82F6' : '#D1D5DB',
                        transition: 'background-color 0.3s ease'
                    }}></div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSavePost;