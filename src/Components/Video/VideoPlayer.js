import React, { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';
import Button from './Button';
import videos from './videos';

const VideoPlayer = ({ className, rightSidebarVisible }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookMark, setIsBookMark] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState([]);
    const [videoTimes, setVideoTimes] = useState([]);
    const [autoplayAllowed, setAutoplayAllowed] = useState(false);
    const videoRefs = useRef([]);
    const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);

    useEffect(() => {
        const allowed = localStorage.getItem('autoplayAllowed') === 'true';
        setAutoplayAllowed(allowed);
    }, []);

    const enableAutoplay = () => {
        setAutoplayAllowed(true);
        localStorage.setItem('autoplayAllowed', 'true');
    };

    const togglePlay = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            if (video.paused) {
                video.play().catch(error => {
                    console.log("Play failed:", error);
                });
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleLike = () => setIsLiked(!isLiked);
    const toggleBookMark = () => setIsBookMark(!isBookMark);

    const toggleMute = () => {
        if (visibleVideoIndex !== null) {
            const video = videoRefs.current[visibleVideoIndex];
            if (video) {
                video.muted = !video.muted;
                setIsMuted(video.muted);
            }
        }
    };

    const updateProgress = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress((prev) => {
                const newProgress = [...prev];
                newProgress[index] = progress;
                return newProgress;
            });
        }
    };

    const handleProgressChange = (e, index) => {
        const video = videoRefs.current[index];
        if (video) {
            const newTime = (e.target.value / 100) * video.duration;
            video.currentTime = newTime;
            setProgress((prev) => {
                const newProgress = [...prev];
                newProgress[index] = e.target.value;
                return newProgress;
            });
        }
    };

    const handleVisibilityChange = (entries) => {
        entries.forEach((entry, index) => {
            const video = videoRefs.current[index];
            if (entry.isIntersecting) {
                setVisibleVideoIndex(index); // Actualiza el índice del video visible
                if (video) {
                    // Restaura el tiempo guardado del video
                    video.currentTime = videoTimes[index] || 0;
                    if (autoplayAllowed && video.paused) { // Solo reproducir si está pausado
                        video.play().catch(error => {
                            console.log("Autoplay failed:", error);
                        });
                    }
                }
            } else {
                if (video) {
                    // Guarda el tiempo actual del video antes de pausarlo
                    setVideoTimes((prev) => {
                        const newTimes = [...prev];
                        newTimes[index] = video.currentTime;
                        return newTimes;
                    });
                    if (!video.paused) { // Solo pausar si está reproduciéndose
                        video.pause();
                    }
                }
            }
        });
    };

    useEffect(() => {
        const currentVideoRefs = videoRefs.current; // Copia el valor actual de videoRefs
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(handleVisibilityChange, observerOptions);

        currentVideoRefs.forEach((videoRef) => {
            if (videoRef) {
                observer.observe(videoRef);
            }
        });

        return () => {
            currentVideoRefs.forEach((videoRef) => {
                if (videoRef) {
                    observer.unobserve(videoRef);
                }
            });
        };
    }, [autoplayAllowed]); // Dependencia añadida para reaccionar a cambios en autoplayAllowed

    useEffect(() => {
        const currentVideoRefs = videoRefs.current; // Copia el valor actual de videoRefs
        const cleanupFunctions = currentVideoRefs.map((videoRef, index) => {
            if (videoRef) {
                const handleTimeUpdate = () => updateProgress(index);
                videoRef.addEventListener('timeupdate', handleTimeUpdate);
                return () => videoRef.removeEventListener('timeupdate', handleTimeUpdate);
            }
            return () => { };
        });

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, []); // Dependencias vacías porque los event listeners se configuran una sola vez

    return (
        <div className={`video-player-container ${className}`}>
            <MenuVideo
            rightSidebarVisible={rightSidebarVisible}
            />

            <div className="video-wrapper">
                {videos.map((video, index) => (
                    <div key={video.id} className="video-container">
                        <section className='video-section'>
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                src={video.src}
                                className="video-element"
                                controls={false}
                                muted={isMuted}
                            />
                        </section>

                        <div
                            className="play-overlay"
                            onClick={() => togglePlay(index)}
                            style={{ width: '100%', height: '100%' }}
                        >
                        </div>

                        <input
                            type="range"
                            className="progress-bar"
                            min="0"
                            max="100"
                            value={progress[index] || 0}
                            onChange={(e) => handleProgressChange(e, index)}
                        />

                        <div className="sidebar-controls">
                            <div
                                className="icon-container"
                                onClick={toggleLike}
                                style={{ color: isLiked ? '#ff2d55' : '#fff' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" />
                                </svg>
                                <span>{video.likes}</span>
                            </div>
                            <div className="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path fill="currentColor" d="M19 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3.697l-2.61 1.74c-.42.28-.966.28-1.386 0L8.697 19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM8.5 10a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3" />
                                    </g>
                                </svg>
                                <span>{video.comments}</span>
                            </div>
                            <div className="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <path d="m8.5 13.5l7 4m0-11l-7 4" />
                                    </g>
                                </svg>
                                <span>{video.shares}</span>
                            </div>
                            <div
                                className="icon-container bookmark-icon"
                                onClick={toggleBookMark}
                                style={{ color: isBookMark ? 'var(--tekken-neon-blue)' : '#fff' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z" />
                                </svg>
                                <span>{video.shares}</span>
                            </div>
                        </div>

                        <div className="bottom-info">
                            <div className="username">{video.username}</div>
                            <div className="description">{video.description}</div>
                        </div>

                        <div className="sound-control" onClick={toggleMute}>
                            {isMuted ? '🔇' : '🔊'} {isPlaying ? '' : ''}
                        </div>
                    </div>
                ))}
            </div>

            {!autoplayAllowed && (
                <div className="autoplay-permission">
                    <button onClick={enableAutoplay}>
                        🎥 Permitir reproducción automática
                    </button>
                </div>
            )}
        </div>
    );
};


export function MenuVideo({rightSidebarVisible}) {
    const [showButton, setShowButton] = useState(false);
    const expandedRightClass = rightSidebarVisible ? 'expanded-right' : '';

    return (
        <>
            <div className={`menu-icon ${expandedRightClass}`} onClick={() => setShowButton(!showButton)}>☰</div>
            {showButton && <Button />}
        </>
    );
}

export default VideoPlayer;