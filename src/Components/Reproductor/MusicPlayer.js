// MusicPlayer.jsx
import React, { useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [isRandom, setIsRandom] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [liked, setLiked] = useState(false);

    const songs = [
        {
            title: "Cybernetic Dreams",
            artist: "Neural Pulse",
            duration: "3:45",
            cover: "/api/placeholder/400/400",
            lyrics: "Through digital waves of light\nIn the neural network tonight\nCybernetic dreams take flight\nIn a world of binary light"
        },
        {
            title: "Digital Horizon",
            artist: "Quantum Beat",
            duration: "4:20",
            cover: "/api/placeholder/400/400",
            lyrics: "On the edge of tomorrow's dawn\nWhere digital dreams are drawn\nIn the space between ones and zeros\nWe find our digital heroes"
        }
    ];

    return (
        <div className="music-player">
            {/* Album Art */}
            <div className="album-art">
                <img src={songs[currentSong].cover} alt="Album Cover" />
                <button
                    className="play-overlay"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
            </div>

            {/* Player Controls */}
            <div className="player-controls">
                <div className="song-info">
                    <div className="song-title">{songs[currentSong].title}</div>
                    <div className="song-artist">{songs[currentSong].artist}</div>
                </div>

                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-handle"></div>
                    </div>
                </div>

                <div className="time-display">
                    <span>1:15</span>
                    <span>{songs[currentSong].duration}</span>
                </div>

                <div className="control-buttons">
                    <button
                        className={`control-btn ${isRandom ? 'active' : ''}`}
                        onClick={() => setIsRandom(!isRandom)}
                    >
                        🔀
                    </button>
                    <button
                        className="control-btn"
                        onClick={() => setCurrentSong(prev => (prev > 0 ? prev - 1 : songs.length - 1))}
                    >
                        ⏮
                    </button>
                    <button
                        className="control-btn play-btn"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button
                        className="control-btn"
                        onClick={() => setCurrentSong(prev => (prev < songs.length - 1 ? prev + 1 : 0))}
                    >
                        ⏭
                    </button>
                    <button
                        className={`control-btn ${isRepeat ? 'active' : ''}`}
                        onClick={() => setIsRepeat(!isRepeat)}
                    >
                        🔁
                    </button>
                </div>

                <section className='btn-options-music'>
                    <button
                        className={`like-btn ${liked ? 'active' : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        {liked ? '❤️ Liked' : '🤍 Like'}
                    </button>

                    <button
                        className="lyrics-toggle"
                        onClick={() => setShowLyrics(!showLyrics)}
                    >
                        {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                    </button>
                </section>

                <div className={`lyrics-container ${showLyrics ? 'show' : ''}`}>
                    {songs[currentSong].lyrics}
                </div>
            </div>

            {/* Playlist */}
            <div className="playlist">
                <div className="playlist-header">Playlist</div>
                <div className="playlist-songs">
                    {songs.map((song, index) => (
                        <div
                            key={index}
                            className={`song-item ${currentSong === index ? 'active' : ''}`}
                            onClick={() => setCurrentSong(index)}
                        >
                            <img
                                src={song.cover}
                                alt={`${song.title} thumbnail`}
                                className="song-thumbnail"
                            />
                            <div className="song-details">
                                <div className="song-name">{song.title}</div>
                                <div className="artist-name">{song.artist}</div>
                            </div>
                            <div className="song-duration">{song.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;