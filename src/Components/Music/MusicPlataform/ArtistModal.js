import React, { useState } from 'react';
import Sectbar from '../../Sectbar';

export const ArtistModal = ({ artist, onClose, leftSidebarVisible, rightSidebarVisible, handlePlay, handlePause }) => {
    const [showArtistSongs, setShowArtistSongs] = useState(false);
    const [playingSong, setPlayingSong] = useState(null);

    return (
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
        >
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{artist.artist}</h2>
                        <button onClick={onClose} className="close-button">✕</button>
                    </div>

                    <div className="artist-info">
                        <img src={artist.artistInfo.image} alt={artist.artist} className="artist-image" />
                        <div>
                            <p className="artist-bio">{artist.artistInfo.bio}</p>
                            <div className="social-links">
                                {Object.entries(artist.artistInfo.social).map(([platform, handle]) => (
                                    <a
                                        key={platform}
                                        href={`https://${platform}.com/${handle.replace('@', '')}`}
                                        className="social-link"
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span> {handle}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowArtistSongs(!showArtistSongs)}
                        className="toggle-songs-button"
                    >
                        {showArtistSongs ? "Ocultar música" : "Ver música del artista"}
                    </button>

                    {showArtistSongs && (
                        <div className="songs-list">
                            <div className="song-header">
                                <span>Título</span>
                                <span>Duración</span>
                                <span>Reproducciones</span>
                                <span></span>
                            </div>
                            {artist.artistInfo.songs.map((song) => (
                                <div key={song.id} className="song-item">
                                    <span className="song-title">{song.title}</span>
                                    <span className="song-duration">{song.duration}</span>
                                    <span className="song-plays">{song.plays}</span>
                                    <button
                                        className="play-button"
                                        onClick={() => {
                                            if (playingSong === song.id) {
                                                handlePause();
                                                setPlayingSong(null);
                                            } else {
                                                handlePlay(song.audioUrl);
                                                setPlayingSong(song.id);
                                            }
                                        }}
                                    >
                                        {playingSong === song.id ? "Pausar" : "Reproducir"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Sectbar>
    );
};